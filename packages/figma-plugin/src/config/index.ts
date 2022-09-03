import { bannerConfig } from "./banner";
import { buttonConfig } from "./button";
import { once, showUI } from "@create-figma-plugin/utilities";
import { breadcrumbConfig } from "./breadcrumb";
import { avatarConfig } from "./avatar";
import { chipConfig } from "./chip";
import { disclosureConfig } from "./disclosure";
import { disclosureGroupConfig } from "./disclosureGroup";
import { feedbackConfig } from "./feedback";
import { dateFieldConfig } from "./dateField";
import { fieldConfig } from "./field";
import { inputConfig } from "./input";
import { selectionControlConfig } from "./selectionControl";
import { formLayoutConfig } from "./formLayout";
import { iconButtonConfig } from "./iconButton";
import { inlineLoaderConfig } from "./inlineLoader";

export default function exportConfig() {
  const config /*: Record<keyof BentoConfig, unknown> */ = {
    avatar: avatarConfig(),
    banner: bannerConfig(),
    breadcrumb: breadcrumbConfig(),
    button: buttonConfig(),
    chip: chipConfig(),
    dateField: dateFieldConfig(),
    disclosure: disclosureConfig(),
    disclosureGroup: disclosureGroupConfig(),
    feedback: feedbackConfig(),
    field: fieldConfig(),
    input: inputConfig(),
    selectionControl: selectionControlConfig(),
    formLayout: formLayoutConfig(),
    iconButton: iconButtonConfig(),
    inlineLoader: inlineLoaderConfig(),
  };

  showUI({ title: "Bento config", width: 360, height: 600 }, { config });

  once("copiedToClipboard", () => {
    figma.notify("Config copied to clipboard");
  });
}
