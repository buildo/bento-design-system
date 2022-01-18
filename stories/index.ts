import { createBentoBox, createLayoutComponents } from "../src";
import { sprinkles } from "./sprinkles.css";

export { Placeholder } from "../src";

export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(sprinkles);
