import { ComponentProps } from "react";
import { Body, Label } from "..";
import { createField } from "./createField";
import { createTextField } from "../TextField/createTextField";
import { BentoSprinkles } from "src/internal";

type FieldsConfig = {
  labelSize?: ComponentProps<typeof Label>["size"];
  assistiveTextSize?: ComponentProps<typeof Body>["size"];
  inputFontSize?: ComponentProps<typeof Body>["size"];
  inputRadius?: BentoSprinkles["borderRadius"];
  inputPaddingX?: BentoSprinkles["paddingX"];
  inputPaddingY?: BentoSprinkles["paddingY"];
};

export function createFormFields({
  labelSize = "small",
  assistiveTextSize = "small",
  inputRadius = 8,
  inputPaddingX = 16,
  inputPaddingY = 16,
  inputFontSize = "large",
}: FieldsConfig) {
  const Field = createField({
    label: { size: labelSize },
    assistiveText: { size: assistiveTextSize, paddingLeft: inputPaddingX },
  });

  const TextField = createTextField(Field, {
    radius: inputRadius,
    paddingX: inputPaddingX,
    paddingY: inputPaddingY,
    fontSize: inputFontSize,
  });

  return { Field, TextField };
}
