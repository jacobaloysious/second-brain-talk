import type { PacketFile } from "./types";

const encoder = new TextEncoder();

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) !== 0 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
}

const crcTable = makeCrcTable();

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concat(parts: Uint8Array[]) {
  const length = parts.reduce((total, part) => total + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function localHeader(
  name: Uint8Array,
  bytes: Uint8Array,
  checksum: number,
) {
  const header = new Uint8Array(30);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0x0800, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0x21, true);
  view.setUint32(14, checksum, true);
  view.setUint32(18, bytes.length, true);
  view.setUint32(22, bytes.length, true);
  view.setUint16(26, name.length, true);
  view.setUint16(28, 0, true);
  return concat([header, name, bytes]);
}

function centralHeader(
  name: Uint8Array,
  bytes: Uint8Array,
  checksum: number,
  offset: number,
) {
  const header = new Uint8Array(46);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0x0800, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint16(14, 0x21, true);
  view.setUint32(16, checksum, true);
  view.setUint32(20, bytes.length, true);
  view.setUint32(24, bytes.length, true);
  view.setUint16(28, name.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, offset, true);
  return concat([header, name]);
}

export function createPacketZip(files: PacketFile[]) {
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  for (const file of files) {
    const name = encoder.encode(file.name);
    const bytes = encoder.encode(file.content);
    const checksum = crc32(bytes);
    const local = localHeader(name, bytes, checksum);
    const central = centralHeader(name, bytes, checksum, localOffset);

    localParts.push(local);
    centralParts.push(central);
    localOffset += local.length;
  }

  const localDirectory = concat(localParts);
  const centralDirectory = concat(centralParts);
  const end = new Uint8Array(22);
  const view = new DataView(end.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(4, 0, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, files.length, true);
  view.setUint16(10, files.length, true);
  view.setUint32(12, centralDirectory.length, true);
  view.setUint32(16, localDirectory.length, true);
  view.setUint16(20, 0, true);

  return new Blob([localDirectory, centralDirectory, end], {
    type: "application/zip",
  });
}
