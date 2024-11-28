import type { i18n, InitOptions } from "i18next";
import type en from "../public/locales/en.json";

export default {
  supportedLngs: ["en", "it"],
  fallbackLng: "en",
} satisfies InitOptions;

export function registerCustomFormats(i18n: i18n) {
  i18n.services.formatter?.add("capitalize", (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}
