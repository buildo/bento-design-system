import { bannerConfig } from "./banner";
import { buttonConfig } from "./button";
import { once, showUI } from "@create-figma-plugin/utilities";
import { breadcrumbConfig } from "./breadcrumb";
import { avatarConfig } from "./avatar";
import { chipConfig } from "./chip";
import { disclosureConfig } from "./disclosure";
import { disclosureGroupConfig } from "./disclosureGroup";
import { feedbackConfig } from "./feedback";
import { BentoConfig } from "@buildo/bento-design-system";
import { dateFieldConfig } from "./dateField";
import { fieldConfig } from "./field";

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
  };

  showUI({ title: "Bento config", width: 360, height: 600 }, { config });

  once("copiedToClipboard", () => {
    figma.notify("Config copied to clipboard");
  });
}
