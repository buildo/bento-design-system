// NOTE(gabro): don't import from ".." in this file, or it will cause a circular dependency

import { createLayoutComponents } from "../Layout/createLayoutComponents";
import { bentoSprinkles } from "./sprinkles.css";

export { bentoSprinkles };
export * from "./Box/Box";
export const { Column, Columns, Inline, Inset, Stack } = createLayoutComponents(bentoSprinkles);
