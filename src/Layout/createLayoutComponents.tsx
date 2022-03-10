import { BoxType } from "../Box/createBentoBox";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { createInline } from "./createInline";
import { createStack } from "./createStack";
import { createColumns } from "./createColumns";
import { createInset } from "./createInset";
import { createBleed } from "./createBleed";

export function createLayoutComponents<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>
) {
  const Inline = createInline(Box);
  const Inset = createInset(Box);
  const Stack = createStack(Box);
  const { Column, Columns } = createColumns(Box);
  const Bleed = createBleed(Box);

  return {
    Inline,
    Stack,
    Inset,
    Column,
    Columns,
    Bleed,
  };
}
