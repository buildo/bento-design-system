import { DisclosureProps } from "../Disclosure/createDisclosure";
import { BentoSprinkles } from "../internal";

export type DisclosureGroupConfig = {
  groupSpacing: BentoSprinkles["gap"];
  disclosureSpacing: BentoSprinkles["gap"];
  dividers: boolean;
  defaultIconPosition: NonNullable<DisclosureProps["iconPosition"]>;
};
