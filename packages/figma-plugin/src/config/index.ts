import { bannerConfig } from "./banner";
import { buttonConfig } from "./button";
import { once, showUI } from "@create-figma-plugin/utilities";

export default function exportConfig() {
  const config = {
    banner: bannerConfig(),
    button: buttonConfig(),
  };

  showUI({ title: "Bento config", width: 360, height: 600 }, { config });

  once("copiedToClipboard", () => {
    figma.notify("Config copied to clipboard");
  });
}
