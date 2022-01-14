import { createLayoutComponents } from "../Layout/createLayoutComponents";
import { bentoSprinkles } from "./sprinkles.css";

export * from "./Box/Box";

const { Column, Columns, Inline, Inset, Stack } = createLayoutComponents(bentoSprinkles);
export { Column, Columns, Inline, Inset, Stack };
