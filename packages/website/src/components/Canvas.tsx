import CodeBlock from "@theme/CodeBlock";
import * as React from "react";
import { Expression, VariableDeclaration, Node } from "@babel/types";
import { transform } from "@babel/standalone";
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
  traverse(ast, {
    enter(path) {
      if (path.node.type === "ReturnStatement") {
        componentBodyAst = path.node.argument;
      }
    },
  });

  const componentSource = componentBodyAst ? format(generate(componentBodyAst).code) : null;

  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Suspense fallback={<div>Loading example...</div>}>
        <div className={styles.container}>
          <div className={styles.preview}>
            <Component />
          </div>
          {componentSource && (
            <>
              <div style={{ display: showSource ? "block" : "none" }}>
                <CodeBlock language="jsx" className={styles.codeBlock}>
                  {componentSource}
                </CodeBlock>
              </div>
              <div className={styles.actions}>
                <ActionButton
                  onClick={() => setShowSource((s) => !s)}
                  label={showSource ? "▲ Hide code" : "▼ View code"}
                />
                <OpenInPlayroom ast={ast} componentSource={componentSource} />
              </div>
            </>
          )}
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

function OpenInPlayroom({ componentSource, ast }: { componentSource: string; ast: Node }) {
  const useStateStatements = [] as VariableDeclaration[];

  traverse(ast, {
    enter(path) {
      if (path.node.type === "VariableDeclaration") {
        const isUseStateDeclaration = path.node.declarations.some(
          (d) =>
            d.init?.type === "CallExpression" &&
            ((d.init.callee.type === "MemberExpression" &&
              d.init.callee.object.type === "Identifier" &&
              d.init.callee.object.name === "React" &&
              d.init.callee.property.type === "Identifier" &&
              ["useState", "useReducer"].includes(d.init.callee.property.name)) ||
              (d.init.callee.type === "Identifier" && d.init.callee.name === "useToast"))
        );
        if (isUseStateDeclaration) {
          useStateStatements.push(path.node);
        }
      }
    },
  });

  const playroomSource = componentSource
    ? generatePlayroomSource(componentSource, useStateStatements)
    : null;

  return playroomSource != null ? (
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
  ) : null;
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
