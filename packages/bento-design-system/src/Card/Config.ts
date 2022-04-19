import { BoxProps } from "../Box/createBentoBox";
import { bentoSprinkles } from "../internal";

export type CardConfig = {
  defaultRadius: Exclude<BoxProps<typeof bentoSprinkles>["borderRadius"], "circled">;
};
