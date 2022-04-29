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
import { createUrl } from "playroom/utils";
import styles from "./Canvas.module.css";

export function Canvas({
  path,
  initialShowSource = false,
}: {
  path: string;
  initialShowSource: boolean;
}) {
  const [showSource, setShowSource] = useState(initialShowSource);

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
        <div className={styles.container}>
          <div className={styles.preview}>
            <Component />
          </div>
          {source && (
            <div style={{ display: showSource ? "block" : "none" }}>
              <CodeBlock language="jsx" className={styles.codeBlock}>
                {source}
              </CodeBlock>
            </div>
          )}
          <div className={styles.actions}>
            <ActionButton
              onClick={() => setShowSource((s) => !s)}
              label={showSource ? "▲ Hide code" : "▼ View code"}
            />
            {source && (
              <ActionButton
                onClick={() => {
                  const url = createUrl({
                    code: source!,
                    baseUrl: "https://playroom.bento.buildo.io",
                  });
                  window.open(url, "_blank");
                }}
                label="▶️ Open in Playroom"
              />
            )}
          </div>
        </div>
      </Suspense>
    </DesignSystemProvider>
  );
}

function ActionButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button className={styles.actionButton} onClick={onClick}>
      {label}
    </button>
  );
}
