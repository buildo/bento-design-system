import { ComponentProps } from "react";
import { Body, BoxProps, Label } from "..";
import { createField } from "./createField";
import { createTextField } from "../TextField/createTextField";
import { bentoSprinkles } from "src/internal";

type FieldsConfig = {
  labelSize?: ComponentProps<typeof Label>["size"];
  assistiveTextSize?: ComponentProps<typeof Body>["size"];
  inputFontSize?: ComponentProps<typeof Body>["size"];
  inputRadius?: BoxProps<typeof bentoSprinkles>["borderRadius"];
  inputPaddingX?: BoxProps<typeof bentoSprinkles>["paddingX"];
  inputPaddingY?: BoxProps<typeof bentoSprinkles>["paddingY"];
};

export function createFormFields({
  labelSize = "small",
  assistiveTextSize = "small",
  inputRadius = "8",
  inputPaddingX = "16",
  inputPaddingY = "16",
  inputFontSize = "large",
}: FieldsConfig) {
  const Field = createField({ labelSize, assistiveTextSize, leftSpace: inputPaddingX });

  const TextField = createTextField(Field, {
    radius: inputRadius,
    paddingX: inputPaddingX,
    paddingY: inputPaddingY,
    fontSize: inputFontSize,
  });

  return { Field, TextField };
}
