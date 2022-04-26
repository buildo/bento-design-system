import CodeBlock from "@theme/CodeBlock";
import * as React from "react";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import prettier from "prettier/standalone";
import parserTypeScript from "prettier/parser-typescript";

export function Canvas({ path }: { path: string }) {
  let rawSource: string | null = null;
  import(`!!raw-loader!@site/src/snippets/${path}`).then((s) => {
    rawSource = s;
  });
  let Component: React.ComponentType | null = null;
  import(`@site/src/snippets/${path}`).then((C) => {
    Component = C;
  });

  if (!rawSource || !Component) {
    return null;
  }

  const ast = parse(rawSource, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
  let componentBodyAst = null;
  traverse(ast, {
    enter(path) {
      if (path.node.type === "ReturnStatement") {
        componentBodyAst = path.node.argument;
      }
    },
  });

  const source = prettier.format(generate(componentBodyAst).code, {
    parser: "typescript",
    plugins: [parserTypeScript],
    jsxSingleQuote: false,
  });

  return (
    <>
      <div style={{ padding: 16, border: "1px solid slategray" }}>
        <Component />
      </div>
      <CodeBlock language="jsx">{source}</CodeBlock>
    </>
  );
}
