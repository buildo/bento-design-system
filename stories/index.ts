import "../src/reset.css";
import { createBentoBox, createLayoutComponents, createTextField } from "../src";
import { sprinkles } from "./sprinkles.css";

export * from "../src/";
export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(Box);
export const TextField = createTextField({
  radius: "8",
  padding: "16",
});
