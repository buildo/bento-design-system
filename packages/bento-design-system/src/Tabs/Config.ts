import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { TabsSize } from "./Tabs";

type SizeConfig<T> = Record<TabsSize, T>;

type TabsWidthConfig =
  | {
      tabsWidth: "fit-content";
      tabsAlignment: "left" | "center" | "right";
    }
  | {
      tabsWidth: "fill-parent";
      tabsAlignment?: never;
    };

type TabsKindConfig =
  | {
      kind: "folder";
      radius:
        | BentoSprinkles["borderRadius"]
        | { topLeft: BentoSprinkles["borderRadius"]; topRight: BentoSprinkles["borderRadius"] };
    }
  | {
      kind: "underline";
      lineHeight: SizeConfig<number>;
      lineColor: NonNullable<BentoSprinkles["decoration"]>;
    };

export type TabsConfig = TabsWidthConfig &
  TabsKindConfig & {
    spaceBetweenTabs: BentoSprinkles["gap"];
    internalSpacing: BentoSprinkles["gap"];
    paddingX: SizeConfig<BentoSprinkles["paddingX"]>;
    paddingY: SizeConfig<BentoSprinkles["paddingY"]>;
    labelSize: SizeConfig<LabelProps["size"]>;
    uppercaseLabel: boolean;
    iconSize: IconProps["size"];
    notificationSize: number;
    notificationColor: BentoSprinkles["color"];
  };
