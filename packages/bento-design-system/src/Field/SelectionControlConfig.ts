import { ComponentProps } from "react";
import { BentoSprinkles } from "../internal";
import { Body } from "../Typography/Body/Body";

export type SelectionControlGroupConfig = {
  paddingY: BentoSprinkles["gap"];
  internalSpacing: {
    horizontal: BentoSprinkles["gap"];
    vertical: BentoSprinkles["gap"];
  };
};

export type SelectionControlConfig = {
  controlLabelSpacing: BentoSprinkles["gap"];
  labelPaddingTop: number;
  labelSize: ComponentProps<typeof Body>["size"];
};

export const defaultSelectionControlConfig: {
  group: SelectionControlGroupConfig;
  element: SelectionControlConfig;
} = {
  group: {
    paddingY: 8,
    internalSpacing: {
      horizontal: 24,
      vertical: 16,
    },
  },
  element: {
    labelPaddingTop: 2,
    controlLabelSpacing: 8,
    labelSize: "large",
  },
};
