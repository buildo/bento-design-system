import { bannerConfig } from "./banner";
import { buttonConfig } from "./button";
import { once, showUI } from "@create-figma-plugin/utilities";
import { breadcrumbConfig } from "./breadcrumb";
import { avatarConfig } from "./avatar";
import { chipConfig } from "./chip";

export default function exportConfig() {
  const config = {
    avatar: avatarConfig(),
    banner: bannerConfig(),
    breadcrumb: breadcrumbConfig(),
    button: buttonConfig(),
    chip: chipConfig(),
  };

  showUI({ title: "Bento config", width: 360, height: 600 }, { config });

  once("copiedToClipboard", () => {
    figma.notify("Config copied to clipboard");
  });
}
