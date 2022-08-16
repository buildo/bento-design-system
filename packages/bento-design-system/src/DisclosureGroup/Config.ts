import { DisclosureProps } from "../Disclosure/Disclosure";
import { BentoSprinkles } from "../internal";

export type DisclosureGroupConfig = {
  groupSpacing: BentoSprinkles["gap"];
  disclosureSpacing: BentoSprinkles["gap"];
  defaultIconPosition: NonNullable<DisclosureProps["iconPosition"]>;
};
