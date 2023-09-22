import "./theme.css";
import "../src/reset.css";
import "../src/global.css";
import "../src/defaultTheme.css";

import { createBentoProvider, defaultConfigs, withBentoConfig, Tabs, Actions } from "../src";
import { sprinkles } from "./sprinkles.css";

export * from "../src";

export const BentoProvider = createBentoProvider(
  {
    chip: {
      customColors: {
        custom: "customColor1",
      },
    },
    pagination: {
      itemsPerPageOptions: [5, 10, 20, 50],
    },
  },
  sprinkles
);

export const FolderTabs = Tabs;
export const UnderlineTabs = withBentoConfig({ tabs: defaultConfigs.underlineTabs }, Tabs);
export const RightActions = Actions;
export const LeftActions = withBentoConfig(
  {
    actions: {
      ...defaultConfigs.actions,
      buttonsAlignment: "left",
      primaryPosition: "left",
    },
  },
  Actions
);
export const SpaceBetweenActions = withBentoConfig(
  {
    actions: {
      ...defaultConfigs.actions,
      buttonsAlignment: "spaceBetween",
    },
  },
  Actions
);
