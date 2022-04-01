import { BentoSprinkles } from "../internal";

type DotConfig = {
  color: "brandPrimary" | "brandSecondary" | "brandTertiary";
};
export type AreaLoaderConfig = {
  dots: DotConfig[];
  scrimColor: "light" | "dark";
  messageSize: "small" | "medium" | "large";
  messageColor: "primary" | "primary-inverse";
  readabilityAreaColor: "primary" | "secondary" | "primary-inverse" | "secondary-inverse";
  readabilityAreaBorderRadius: BentoSprinkles["borderRadius"];
};
