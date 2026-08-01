import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const appSource = await readFile(
  new URL("../src/App.tsx", import.meta.url),
  "utf8",
);
const dataSource = await readFile(
  new URL("../src/data.ts", import.meta.url),
  "utf8",
);
const zipSource = await readFile(
  new URL("../src/zip.ts", import.meta.url),
  "utf8",
);
const stylesSource = await readFile(
  new URL("../src/styles.css", import.meta.url),
  "utf8",
);

async function importTypeScriptSource(source, fileName) {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName,
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(moduleUrl);
}

const { PACKET_CHECKSUM, PACKET_VERSION, packetFiles } =
  await importTypeScriptSource(dataSource, "data.ts");
const { createPacketZip } = await importTypeScriptSource(zipSource, "zip.ts");
const railSource = await readFile(
  new URL("../src/components/AgentRail.tsx", import.meta.url),
  "utf8",
);
const modalSource = await readFile(
  new URL("../src/components/PacketModal.tsx", import.meta.url),
  "utf8",
);
const pullRequestSource = await readFile(
  new URL("../src/components/PullRequestModal.tsx", import.meta.url),
  "utf8",
);
const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const portableHtml = await readFile(
  new URL("../portable/[Demo]Second Brain Presenter.html", import.meta.url),
  "utf8",
);

async function readStoredZipEntries(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const decoder = new TextDecoder();
  const entries = new Map();
  let offset = 0;

  while (
    offset + 30 <= bytes.length &&
    view.getUint32(offset, true) === 0x04034b50
  ) {
    assert.equal(
      view.getUint16(offset + 8, true),
      0,
      "packet ZIP entries must use the supported stored format",
    );
    const contentLength = view.getUint32(offset + 18, true);
    const nameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const nameStart = offset + 30;
    const contentStart = nameStart + nameLength + extraLength;
    const contentEnd = contentStart + contentLength;

    assert.ok(contentEnd <= bytes.length, "packet ZIP entry is truncated");
    const name = decoder.decode(bytes.slice(nameStart, nameStart + nameLength));
    const content = decoder.decode(bytes.slice(contentStart, contentEnd));
    entries.set(name, content);
    offset = contentEnd;
  }

  return entries;
}

test("the local build exposes the application root", () => {
  assert.match(html, /id="root"/);
  assert.match(html, /Second Brain/);
  assert.match(html, /\.\/assets\//);
});

test("the portable fallback contains no external asset references", () => {
  assert.match(portableHtml, /id="root"/);
  assert.match(portableHtml, /<style>/);
  assert.match(portableHtml, /<script type="module">/);
  assert.doesNotMatch(portableHtml, /src="\.\/assets\//);
  assert.doesNotMatch(portableHtml, /href="\.\/assets\//);
});

test("the interface exposes three role-scoped agents", () => {
  assert.match(dataSource, /name: "OnSite Fab Agent"/);
  assert.match(dataSource, /name: "Fixer Agent"/);
  assert.match(dataSource, /name: "Manager Assistant"/);
  assert.match(appSource, /Role-scoped context/);
  assert.match(railSource, /Same foundation/);
});

test("the onsite conversation preserves the review and transfer boundary", () => {
  assert.match(appSource, /Missing approved review status/);
  assert.match(appSource, /restricted evidence is still onsite/i);
  assert.match(appSource, /View contents/);
  assert.match(appSource, /Download \.zip/);
  assert.match(modalSource, /Raw fab evidence is intentionally absent/);
  assert.match(dataSource, /classification: sanitized/);
  assert.match(dataSource, /transfer_approved: true/);
});

test("the fixer conversation separates resolution from promotion", () => {
  assert.match(appSource, /Facts stay separate from hypotheses/);
  assert.match(appSource, /Two fixes · different owners/);
  assert.match(appSource, /Create pull request/);
  assert.match(appSource, /Hardware recovered · software guard active/);
  assert.match(appSource, /Explicit time jump/);
  assert.match(appSource, /Case-specific cause or actions cannot become default/);
  assert.match(appSource, /Human approval record is missing/);
  assert.match(appSource, /Owner decision pending/);
  assert.match(appSource, /Shared component guidance is unchanged/);
  assert.match(appSource, /Motion Controls owner: approve/);
  assert.match(appSource, /Six months later · cold start/);
  assert.match(appSource, /Do not assume a damaged damper/);
  assert.match(appSource, /future engineer will see the code safeguard/i);
});

test("the presenter has an explicit, projection-safe stage contract", () => {
  assert.match(appSource, /Deterministic replay/);
  assert.match(appSource, /real local artifacts \+ tests/);
  assert.match(appSource, /no external\s+system changes/);
  assert.match(appSource, /Stage view/);
  assert.match(stylesSource, /\.stage-mode \.message-bubble/);
  assert.match(stylesSource, /font-size: clamp\(20px, 1\.55vw, 24px\)/);
  assert.match(stylesSource, /\.stage-mode \.chat-composer/);
  assert.match(stylesSource, /\.stage-mode \.standard-detail/);
  assert.match(stylesSource, /\.stage-mode \.stage-only/);
});

test("the mock pull request exposes a readable code diff and review boundary", () => {
  assert.match(dataSource, /motion-control\/stage-runtime/);
  assert.match(dataSource, /Require stable velocity before starting alignment/);
  assert.match(dataSource, /positionStable/);
  assert.match(dataSource, /velocityStable/);
  assert.match(dataSource, /requiredStableSamples/);
  assert.match(pullRequestSource, /Diff for/);
  assert.match(pullRequestSource, /No remote repository is/);
});

test("the manager conversation retains uncertainty and rejects people judgment", () => {
  assert.match(appSource, /Keep uncertain/);
  assert.match(appSource, /is not retained/);
  assert.match(appSource, /Nothing has been sent/);
  assert.match(appSource, /External actions 0/);
});

test("the ZIP implementation writes standard local, central, and end signatures", () => {
  assert.match(zipSource, /0x04034b50/);
  assert.match(zipSource, /0x02014b50/);
  assert.match(zipSource, /0x06054b50/);
  assert.match(dataSource, /debug-packet\.md/);
  assert.match(dataSource, /manifest\.json/);
  assert.match(dataSource, /README\.md/);
});

test("the packet ZIP manifest authenticates the embedded debug packet", async () => {
  const entries = await readStoredZipEntries(createPacketZip(packetFiles));
  assert.deepEqual([...entries.keys()], [
    "debug-packet.md",
    "manifest.json",
    "README.md",
  ]);

  const debugPacket = entries.get("debug-packet.md");
  const manifest = JSON.parse(entries.get("manifest.json"));
  const actualChecksum = createHash("sha256")
    .update(debugPacket, "utf8")
    .digest("hex");
  const expectedVersion = `${manifest.packet_id}-${actualChecksum.slice(0, 16)}`;

  assert.equal(manifest.sha256, actualChecksum);
  assert.equal(PACKET_CHECKSUM, actualChecksum);
  assert.equal(manifest.version, expectedVersion);
  assert.equal(PACKET_VERSION, expectedVersion);
});

test("the source is local and deterministic", async () => {
  const sourceDirectory = new URL("../src/", import.meta.url);
  const files = await readdir(sourceDirectory, { recursive: true });
  const sourceFiles = files.filter((file) => /\.(ts|tsx)$/.test(file));
  const combined = (
    await Promise.all(
      sourceFiles.map((file) => readFile(new URL(file, sourceDirectory), "utf8")),
    )
  ).join("\n");

  assert.doesNotMatch(combined, /\bfetch\s*\(/);
  assert.doesNotMatch(combined, /\bWebSocket\b/);
  assert.doesNotMatch(combined, /\bEventSource\b/);
  assert.doesNotMatch(combined, /\blocalStorage\b/);
  assert.doesNotMatch(combined, /\bindexedDB\b/);
  assert.doesNotMatch(combined, /fab-side\/raw-logs/);
  assert.doesNotMatch(
    appSource,
    /Guided demo · deterministic responses · no live AI/,
  );
  assert.doesNotMatch(appSource, /Mock telemetry event/);
  assert.match(appSource, /Thinking…/);
  assert.match(appSource, /Generating results…/);
  assert.match(appSource, /Rendering UI…/);
  assert.match(
    appSource,
    /const \[showInspector, setShowInspector\] = useState\(false\);/,
  );
  assert.match(
    appSource,
    /const \[showCue, setShowCue\] = useState\(false\);/,
  );
});
