import { defaultConfigs, withBentoConfig, Tabs, Actions } from "../src";

export * from "../src";

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
