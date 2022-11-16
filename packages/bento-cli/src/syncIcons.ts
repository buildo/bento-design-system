import * as Figma from "figma-api";
import { isNodeType } from "figma-api";
import { GetFileNodesResult } from "figma-api/lib/api-types.js";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import ora from "ora";
import chalk from "chalk";
import { Ctx } from "./util/Ctx.js";
import { stripEmojis } from "./util/stripEmojis.js";

export async function syncIcons({ ctx, outDir }: { ctx: Ctx; outDir: string }) {
  console.log(chalk.bold("⏺ Icons"));

  const iconsWriteLoader = ora({
    text: `Exporting icons to ${chalk.underline(outDir)}`,
    indent: 2,
  }).start();

  printIconsToDirectory(ctx.iconNodes, outDir);

  iconsWriteLoader.succeed(
    `Exported ${Object.keys(ctx.iconNodes).length} icons to ${chalk.underline(outDir)}`
  );
}

function iconName(icon: Figma.Node<"COMPONENT">) {
  return `Icon${stripEmojis(icon.name.replace(/\s+/g, ""))}`;
}

function printIconsToDirectory(
  iconNodes: GetFileNodesResult<"COMPONENT">["nodes"],
  outDir: string
) {
  const basePath = process.cwd();
  const outDirPath = path.join(basePath, outDir);

  if (fs.existsSync(outDirPath)) {
    fs.rmSync(outDirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(outDirPath, { recursive: true });

  const indexPath = path.join(outDirPath, "index.ts");
  fs.writeFileSync(indexPath, "", "utf-8");

  const icons = [...Object.values(iconNodes)].sort((a, b) =>
    iconName(a!.document) <= iconName(b!.document) ? -1 : 1
  );

  icons.forEach((icon) => {
    const iconFileName = iconName(icon!.document);
    const iconFile = path.join(outDirPath, `${iconFileName}.tsx`);
    fs.writeFileSync(iconFile, printIcon(icon!.document), "utf8");
    fs.appendFileSync(indexPath, `export * from "./${iconFileName}";\n`, "utf-8");
  });
}

function printIcon(icon: Figma.Node<"COMPONENT">) {
  const firstChildren = icon.children[0];
  const body = (() => {
    if (isVectorNode(firstChildren)) {
      return printVector(firstChildren);
    }
    if (isNodeType(firstChildren, "BOOLEAN_OPERATION") || isNodeType(firstChildren, "BOOLEAN")) {
      return printBooleanOperation(firstChildren);
    }
    throw new Error(`Unexpected node type ${firstChildren.type}`);
  })();

  const iconCode = `
import { svgIconProps, IconProps } from "@buildo/bento-design-system";

export function ${iconName(icon)}(props: IconProps) {
  return <svg {...svgIconProps(props)}>
    ${body}
  </svg>
}
  `;

  return prettier.format(iconCode, { parser: "typescript" });
}

function printVector(
  node: Figma.Node<"VECTOR" | "RECTANGLE" | "LINE" | "ELLIPSE" | "STAR" | "REGULAR_POLYGON">
) {
  return [...(node.fillGeometry ?? []), ...(node.strokeGeometry ?? [])]
    .map(({ path }) => `<path d="${path}" />`)
    .join("\n");
}

function isVectorNode(
  node: Figma.Node
): node is Figma.Node<"VECTOR" | "RECTANGLE" | "LINE" | "ELLIPSE" | "STAR" | "REGULAR_POLYGON"> {
  return (
    isNodeType(node, "VECTOR") ||
    isNodeType(node, "ELLIPSE") ||
    isNodeType(node, "RECTANGLE") ||
    isNodeType(node, "LINE") ||
    isNodeType(node, "REGULAR_POLYGON")
  );
}

function printBooleanOperation(node: Figma.Node<"BOOLEAN_OPERATION" | "BOOLEAN">) {
  return node.children.filter(isVectorNode).map(printVector).join("\n");
}
