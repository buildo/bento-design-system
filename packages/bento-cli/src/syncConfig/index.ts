import ora from "ora";
import chalk from "chalk";
import { avatarConfig } from "./avatarConfig.js";
import prettier from "prettier";
import { Ctx } from "../util/Ctx.js";
import { bannerConfig } from "./bannerConfig.js";
import { breadcrumbConfig } from "./breadcrumbConfig.js";
import { buttonConfig } from "./buttonConfig.js";
// @ts-ignore
import { diff } from "deep-object-diff";
import { defaultConfigs } from "@buildo/bento-design-system";
import { pruneEmptyObjects } from "./util/pruneEmptyObjects.js";
import { chipConfig } from "./chipConfig.js";
import { dateFieldConfig } from "./dateFieldConfig.js";
import { disclosureConfig } from "./disclosureConfig.js";
import { disclosureGroupConfig } from "./disclosureGroupConfig.js";
import { feedbackConfig } from "./feedbackConfig.js";
import { fieldConfig } from "./fieldConfig.js";
import { formLayoutConfig } from "./formLayoutConfig.js";
import { iconButtonConfig } from "./iconButtonConfig.js";
import { writeFile } from "../util/writeFile.js";
import { inlineLoaderConfig } from "./inlineLoaderConfig.js";
import { inputConfig } from "./inputConfig.js";
import { selectionControlConfig } from "./selectionControlConfig.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import { actionsConfig } from "./actionsConfig.js";
import { areaLoaderConfig } from "./areaLoaderConfig.js";
import { decorativeDividerConfig } from "./decorativeDividerConfig.js";
import { modalConfig } from "./modalConfig.js";
import { navigationConfig } from "./navigationConfig.js";

export async function syncConfig({
  ctx,
  fullConfig,
  outFile,
}: {
  ctx: Ctx;
  fullConfig: boolean;
  outFile: string;
}) {
  console.log(chalk.bold("⚙️ Config"));

  const config: Record<keyof SimpleBentoConfig, unknown> = {
    actions: actionsConfig(ctx),
    areaLoader: areaLoaderConfig(ctx),
    avatar: avatarConfig(ctx),
    banner: bannerConfig(ctx),
    breadcrumb: breadcrumbConfig(ctx),
    button: buttonConfig(ctx),
    card: {},
    // TODO
    chart: {},
    chip: chipConfig(ctx),
    dateField: dateFieldConfig(ctx),
    decorativeDivider: decorativeDividerConfig(ctx),
    disclosure: disclosureConfig(ctx),
    disclosureGroup: disclosureGroupConfig(ctx),
    // TODO
    dropdown: {},
    feedback: feedbackConfig(ctx),
    field: fieldConfig(ctx),
    // TODO
    fileUploaderField: {},
    formLayout: formLayoutConfig(ctx),
    iconButton: iconButtonConfig(ctx),
    inlineLoader: inlineLoaderConfig(ctx),
    input: inputConfig(ctx),
    // TODO
    list: {},
    // TODO
    menu: {},
    modal: modalConfig(ctx),
    // TODO
    navigation: navigationConfig(ctx),
    // TODO
    progressBar: {},
    // TODO
    readOnlyField: {},
    // TODO
    searchBar: {},
    selectionControl: selectionControlConfig(ctx),
    // TODO
    slider: {},
    // TODO
    stepper: {},
    // TODO
    table: {},
    // TODO
    tabs: {},
    // TODO
    toast: {},
    // TODO
    tooltip: {},
  };

  const minimalConfig = pruneEmptyObjects(diff(defaultConfigs, config));

  const configWriteLoader = ora({
    text: `Exporting config to ${chalk.underline(outFile)}`,
    indent: 2,
  }).start();

  writeFile(
    outFile,
    prettier.format(
      `
      import { PartialBentoConfig } from "@buildo/bento-design-system";

      export const config: PartialBentoConfig = ${JSON.stringify(
        fullConfig ? config : minimalConfig,
        null,
        2
      )}
    `,
      { parser: "typescript" }
    )
  );

  configWriteLoader.succeed(`Exported config to ${chalk.underline(outFile)}`);
}
