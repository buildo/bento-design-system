import CodeBlock from "@theme/CodeBlock";
import * as React from "react";
import { Expression } from "@babel/types";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import prettier from "prettier/standalone";
import parserTypeScript from "prettier/parser-typescript";
import { useEffect, useState, lazy, Suspense } from "react";
import { DesignSystemProvider } from "../snippets";
import { defaultMessages } from "../snippets/defaultMessages";

export function Canvas({ path }: { path: string }) {
  const [rawSource, setRawSource] = useState<string | null>(null);
  useEffect(() => {
    import(`!!raw-loader!@site/src/snippets/${path}`)
      .then(({ default: s }) => setRawSource(s))
      .catch(console.error);
  }, [path]);

  const Component = lazy(() => import(`@site/src/snippets/${path}`));

  if (!rawSource || !Component) {
    return null;
  }

  const ast = parse(rawSource, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
  let componentBodyAst: Expression | null | undefined = null;
  traverse(ast, {
    enter(path) {
      if (path.node.type === "ReturnStatement") {
        componentBodyAst = path.node.argument;
      }
    },
  });

  let source: string | null = null;
  if (componentBodyAst) {
    source = prettier.format(generate(componentBodyAst).code, {
      parser: "typescript",
      plugins: [parserTypeScript],
      jsxSingleQuote: false,
    });
  }

  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Suspense fallback={<div>Loading example...</div>}>
        <div style={{ padding: 16, border: "1px solid slategray" }}>
          <Component />
        </div>
        {source && <CodeBlock language="jsx">{source}</CodeBlock>}
      </Suspense>
    </DesignSystemProvider>
  );
}
