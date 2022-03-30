import { BoxProps } from "../Box/createBentoBox";
import { bentoSprinkles } from "../internal";

export type CardConfig = {
  radius: BoxProps<typeof bentoSprinkles>["borderRadius"];
};
