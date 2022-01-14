import { createLayoutComponents } from "..";
import { bentoSprinkles } from "./sprinkles.css";

export * from "./Box/Box";

const { Column, Columns, Inline, Inset, Stack } = createLayoutComponents(bentoSprinkles);
export { Column, Columns, Inline, Inset, Stack };
