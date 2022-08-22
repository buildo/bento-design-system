import { bannerConfig } from "./banner";
import { buttonConfig } from "./button";
import { once, showUI } from "@create-figma-plugin/utilities";
import { breadcrumb } from "./breadcrumb";

export default function exportConfig() {
  const config = {
    banner: bannerConfig(),
    breadcrumb: breadcrumb(),
    button: buttonConfig(),
  };

  showUI({ title: "Bento config", width: 360, height: 600 }, { config });

  once("copiedToClipboard", () => {
    figma.notify("Config copied to clipboard");
  });
}
