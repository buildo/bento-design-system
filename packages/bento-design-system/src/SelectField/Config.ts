import { BentoSprinkles } from "../internal";
import { ListConfig } from "../List/Config";

export type DropdownConfig = {
  elevation: "small" | "medium" | "large";
  radius: BentoSprinkles["borderRadius"];
  list: ListConfig;
  menuPaddingY: BentoSprinkles["paddingY"];
};
