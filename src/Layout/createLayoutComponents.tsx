import { createBentoBox } from "../Box/createBentoBox";
import { baseSprinkles } from "../sprinkles.css";
import { createInline } from "./createInline";
import { createStack } from "./createStack";
import { createColumns } from "./createColumns";
import { createInset } from "./createInset";

export function createLayoutComponents<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
  const Box = createBentoBox(sprinkles);

  const Inline = createInline(Box);
  const Inset = createInset(Box);
  const Stack = createStack(Box);
  const { Column, Columns } = createColumns(Box);

  return {
    Inline,
    Stack,
    Inset,
    Column,
    Columns,
  };
}
