import { Box, Button, Inline, Popover, TextField } from "@buildo/bento-design-system";
import { useRef, useState } from "react";
import { ChromePicker } from "react-color";

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export function ColorPicker(props: Props) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <Inline space={8} alignY="center">
      <Box
        width={80}
        height={80}
        style={{ backgroundColor: props.value ?? undefined }}
        borderRadius="circled"
        borderColor="outlineDecorative"
        borderWidth={1}
        borderStyle={props.value ? "solid" : "dashed"}
      />
      <div ref={popoverRef} onClick={() => setColorPickerOpen(true)}>
        <TextField
          label="Primary color"
          value={props.value ?? ""}
          onChange={props.onChange}
          placeholder="Hex color"
          isReadOnly
        />
      </div>
      {colorPickerOpen && (
        <Popover onClose={() => setColorPickerOpen(false)} triggerRef={popoverRef}>
          <ChromePicker
            color={props.value ?? undefined}
            onChange={(value) => props.onChange(value.hex)}
          />
        </Popover>
      )}
    </Inline>
  );
}
