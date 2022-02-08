import "../src/reset.css";
import {
  createBentoBox,
  createLayoutComponents,
  createFormFields,
  createButton,
  createBanner,
  createSnackbar,
} from "../lib";
import { sprinkles } from "./sprinkles.css";

export * from "../src";
export const Box = createBentoBox(sprinkles);
<Box paddingX="12" />;

export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(Box);
export const { TextField } = createFormFields({});
export const Button = createButton({});
export const Banner = createBanner({});
export const { Snackbar, SnackbarProvider } = createSnackbar(Button, {});
