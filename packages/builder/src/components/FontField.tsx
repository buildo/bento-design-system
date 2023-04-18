import { Button, Inline, TextField } from "@buildo/bento-design-system";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export function FontField(props: Props) {
  const [fontFamily, setFontFamily] = useState(props.value ?? "");

  const styleRef = useRef<HTMLStyleElement>();
  useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement("style");
    }
    document.head.appendChild(styleRef.current);

    return () => {
      if (document.head.contains(styleRef.current!)) {
        document.head.removeChild(styleRef.current!);
      }
    };
  }, [styleRef]);

  function applyFont() {
    styleRef.current!.innerHTML = `@import url(https://fonts.googleapis.com/css?family=${fontFamily.replaceAll(
      " ",
      "+"
    )});`;
    props.onChange(fontFamily);
  }

  return (
    <Inline space={8} alignY="bottom">
      <TextField
        placeholder="Google font-family"
        label="Font-family"
        value={fontFamily}
        onChange={(value) => setFontFamily(value)}
      />
      <Button kind="solid" hierarchy="primary" onPress={applyFont} label="Apply" />
    </Inline>
  );
}
