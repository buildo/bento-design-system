import { BentoConfig, SelectOption } from "@buildo/bento-design-system";

type RadiusType = BentoConfig["button"]["radius"];
export const radiusOptions: SelectOption<RadiusType>[] = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: "circled",
    label: "circled",
  },
  {
    value: "circledX",
    label: "circledX",
  },
];
