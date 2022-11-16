#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { syncIcons } from "./syncIcons.js";
import { syncTheme } from "./syncTheme.js";
import { syncConfig } from "./syncConfig/index.js";
import { Ctx } from "./util/Ctx.js";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
  .scriptName("bento")
  .usage("$0 <cmd> [args]")
  .pkgConf("bento")
  .command(
    "sync",
    "Sync Bento theme, config and icons from Figma",
    (yargs) => {
      return yargs
        .env()
        .option("figma-file-key", {
          type: "string",
          describe:
            "Figma file key. It is the part of the url after /file/, e.g. https://www.figma.com/file/:fileKey/...",
          demandOption: true,
        })
        .option("icons-out-dir", {
          type: "string",
          describe: "Output directory for icons",
          demandOption: true,
        })
        .option("figma-access-token", {
          type: "string",
          describe:
            "Figma access token. Learn how to generate one here https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens",
          demandOption: true,
        })
        .option("theme-out-file", {
          type: "string",
          describe: "Output file for the theme",
          demandOption: true,
        })
        .option("config-out-file", {
          type: "string",
          describe: "Output file for the config",
          demandOption: true,
        })
        .option("full-config", {
          type: "boolean",
          describe: "Generate a full config, including the default values",
          default: false,
        });
    },
    async ({
      figmaAccessToken,
      figmaFileKey,
      themeOutFile,
      configOutFile,
      iconsOutDir,
      fullConfig,
    }) => {
      const ctx = await Ctx.fromFigma(figmaFileKey, figmaAccessToken);
      await syncTheme({ outFile: themeOutFile, ctx });
      await syncConfig({ outFile: configOutFile, fullConfig, ctx });
      await syncIcons({ outDir: iconsOutDir, ctx });
    }
  )
  .demandCommand()
  .help().argv;
