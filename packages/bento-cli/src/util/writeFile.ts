import path from "path";
import fs from "fs";

export function writeFile(outPath: string, contents: string) {
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(outPath, contents);
}
