import "./fonts.css";
import "../src/reset.css";
import {
  createBentoBox,
  createLayoutComponents,
  createFormFields,
  createButton,
  createBanner,
  createToast,
  createActions,
} from "../src";
import { sprinkles } from "./sprinkles.css";

export * from "../src";
export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(Box);
export const { TextField } = createFormFields({});
export const Button = createButton({});
export const Banner = createBanner({});
export const { Toast, ToastProvider } = createToast(Button, {});
export const Actions = createActions(Button);
