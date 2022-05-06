import CodeBlock from "@theme/CodeBlock";
import * as React from "react";
import { Expression, VariableDeclaration } from "@babel/types";
import { transform, registerPlugin } from "@babel/standalone";
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
import babelPresetTypescript from "@babel/preset-typescript";

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
  const useStateStatements = [] as VariableDeclaration[];
  traverse(ast, {
    enter(path) {
      if (path.node.type === "ReturnStatement") {
        componentBodyAst = path.node.argument;
      }
      if (path.node.type === "VariableDeclaration") {
        const isUseStateDeclaration = path.node.declarations.some(
          (d) =>
            d.init?.type === "CallExpression" &&
            d.init.callee.type === "MemberExpression" &&
            d.init.callee.object.type === "Identifier" &&
            d.init.callee.object.name === "React" &&
            d.init.callee.property.type === "Identifier" &&
            d.init.callee.property.name === "useState"
        );
        if (isUseStateDeclaration) {
          useStateStatements.push(path.node);
        }
      }
    },
  });

  const componentSource = componentBodyAst ? generate(componentBodyAst).code : null;

  const snippetSource = componentSource ? format(componentSource) : null;

  const playroomSource = snippetSource
    ? generatePlayroomSource(snippetSource, useStateStatements)
    : null;

  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Suspense fallback={<div>Loading example...</div>}>
        <div className={styles.container}>
          <div className={styles.preview}>
            <Component />
          </div>
          {snippetSource && (
            <div style={{ display: showSource ? "block" : "none" }}>
              <CodeBlock language="jsx" className={styles.codeBlock}>
                {snippetSource}
              </CodeBlock>
            </div>
          )}
          <div className={styles.actions}>
            <ActionButton
              onClick={() => setShowSource((s) => !s)}
              label={showSource ? "▲ Hide code" : "▼ View code"}
            />
            {playroomSource && (
              <ActionButton
                onClick={() => {
                  const url = createUrl({
                    code: playroomSource,
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

function format(source: string): string {
  return prettier
    .format(source, {
      parser: "typescript",
      plugins: [parserTypeScript],
      jsxSingleQuote: false,
    })
    .replace(/;/g, "");
}

function generatePlayroomSource(
  snippetSource: string,
  useStateStatements: VariableDeclaration[]
): string | null {
  let tsSource: string;
  if (useStateStatements.length > 0) {
    const useStateDeclarationsSource = useStateStatements.map((s) => generate(s).code).join("\n");
    tsSource = `
      {(() => {
        ${useStateDeclarationsSource};

        return ${snippetSource};
      })()}
  `;
  } else {
    tsSource = snippetSource;
  }

  const jsSource = transform(tsSource, {
    filename: "dummy.tsx",
    presets: [babelPresetTypescript],
  })?.code;

  if (jsSource) {
    return format(jsSource);
  } else {
    return null;
  }
}
