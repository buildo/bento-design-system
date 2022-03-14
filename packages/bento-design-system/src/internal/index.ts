// NOTE(gabro): don't import from ".." in this file, or it will cause a circular dependency

import { createLayoutComponents } from "../Layout/createLayoutComponents";
import { Box } from "./Box/Box";

export { bentoSprinkles } from "./sprinkles.css";
export type { BentoSprinkles } from "./sprinkles.css";
export * from "./Box/Box";
export const { Column, Columns, Inline, Inset, Stack, Bleed } = createLayoutComponents(Box);
