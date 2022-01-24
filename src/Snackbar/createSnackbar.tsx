import { ComponentProps, FunctionComponent } from "react";
import { BentoSprinkles } from "../internal";
import { Body, ButtonProps, TextChildren } from "../";
import { createSnackbarInternal } from "./createSnackbarInternal";
import { createSnackbarContainer } from "./createSnackbarContainer";
import { createSnackbarProvider } from "./createSnackbarProvider";

export type SnackbarConfig = {
  paddingX?: {
    withAction: BentoSprinkles["paddingX"];
    withoutAction: BentoSprinkles["paddingX"];
  };
  paddingY?: BentoSprinkles["paddingY"];
  radius?: BentoSprinkles["borderRadius"];
  messageSize?: ComponentProps<typeof Body>["size"];
};

export type SnackbarProps = {
  kind: "informative" | "positive" | "warning" | "negative" | "secondary";
  message: TextChildren;
  action?: Pick<ButtonProps, "onPress" | "label">;
};

export function createSnackbar(
  Button: FunctionComponent<ButtonProps>,
  {
    paddingX = {
      withAction: "0",
      withoutAction: "16",
    },
    paddingY = "16",
    radius = "8",
    messageSize = "medium",
  }: SnackbarConfig
) {
  const Snackbar = createSnackbarInternal(Button, { paddingX, paddingY, radius, messageSize });
  const SnackbarContainer = createSnackbarContainer(Snackbar);
  const SnackbarProvider = createSnackbarProvider(SnackbarContainer);

  return { Snackbar, SnackbarProvider };
}
