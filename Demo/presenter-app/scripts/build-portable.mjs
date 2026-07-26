import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const portableDirectory = path.join(projectRoot, "portable");
const outputPath = path.join(
  portableDirectory,
  "[Demo]Second Brain Presenter.html",
);

const indexPath = path.join(distDirectory, "index.html");
let html = await readFile(indexPath, "utf8");

const stylesheetTag = html.match(
  /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
);
const moduleTag = html.match(
  /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,
);

if (!stylesheetTag || !moduleTag) {
  throw new Error("Expected Vite stylesheet and module tags were not found.");
}

const resolveAsset = (assetReference) =>
  path.resolve(distDirectory, assetReference.replace(/^\.\//, ""));

const css = (await readFile(resolveAsset(stylesheetTag[1]), "utf8")).replace(
  /<\/style/gi,
  "<\\/style",
);
const javascript = (
  await readFile(resolveAsset(moduleTag[1]), "utf8")
)
  .replace(/\/\/# sourceMappingURL=.*$/gm, "")
  .replace(/<\/script/gi, "<\\/script");

html = html
  .replace(stylesheetTag[0], () => `<style>${css}</style>`)
  .replace(
    moduleTag[0],
    () => `<script type="module">${javascript}</script>`,
  );

await mkdir(portableDirectory, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(`Portable presenter created: ${outputPath}`);
