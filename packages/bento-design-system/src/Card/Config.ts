import { BorderRadiusConfig } from "../util/BorderRadiusConfig";
import { PaddingConfig } from "../util/PaddingConfig";

export type CardElevation = "none" | "small" | "medium" | "large";

export type CardConfig = {
  defaultElevation: CardElevation;
  defaultPadding: PaddingConfig;
  defaultRadius: BorderRadiusConfig;
};
