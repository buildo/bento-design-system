import { h } from "preact";
import { render, Container, VerticalSpace, Button, Checkbox, Text } from "@create-figma-plugin/ui";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import styles from "./styles.css";
import "prismjs/components/prism-json.js";
// eslint-disable-next-line import/no-webpack-loader-syntax
import "!prism-theme-night-owl/build/no-italics.css";
import { copyToClipboard } from "figx";
import { emit } from "@create-figma-plugin/utilities";
import { diff } from "deep-object-diff";
import { defaultConfigs } from "@buildo/bento-design-system";
import { useState } from "preact/hooks";
import { pruneEmptyObjects } from "../util/pruneEmptyObjects";

function format(o: object): string {
  return JSON.stringify(o, null, 2);
}

function Plugin(props: { config: Record<string, unknown> }) {
  const minimalConfig = format(pruneEmptyObjects(diff(defaultConfigs, props.config)));
  const configWithDefaults = format(props.config);
  const [includeDefaultValues, setIncludeDefaultValues] = useState(false);
  const code = includeDefaultValues ? configWithDefaults : minimalConfig;

  return (
    <Container space="medium" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div class={styles.noShrink}>
        <VerticalSpace space="medium" />
        <Checkbox
          value={includeDefaultValues}
          onChange={(e) => setIncludeDefaultValues(e.currentTarget.checked)}
        >
          <Text>Include default values</Text>
        </Checkbox>
        <VerticalSpace space="medium" />
        <Button
          fullWidth
          onClick={() => {
            copyToClipboard(code);
            emit("copiedToClipboard");
          }}
        >
          Copy to clipboard
        </Button>
        <VerticalSpace space="medium" />
      </div>
      <div class={styles.editorContainer}>
        <Editor
          readOnly
          highlight={function (code: string) {
            return highlight(code, languages.json, "json");
          }}
          preClassName={styles.editor}
          textareaClassName={styles.editor}
          value={code}
          onValueChange={() => {}}
        />
      </div>
      <div class={styles.noShrink}>
        <VerticalSpace space="medium" />
      </div>
    </Container>
  );
}

export default render(Plugin);
