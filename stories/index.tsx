import "../src/reset.css";
import {
  createBentoBox,
  createLayoutComponents,
  createFormFields,
  createButton,
  createBanner,
} from "../src";
import { sprinkles } from "./sprinkles.css";

export * from "../src";
export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(Box);
export const { TextField } = createFormFields({});
export const Button = createButton({
  paddingX: "16",
  paddingY: {
    small: "8",
    medium: "16",
  },
  labelSize: "large",
  radius: "8",
});
export const Banner = createBanner({});
