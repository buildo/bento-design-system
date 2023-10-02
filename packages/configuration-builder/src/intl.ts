import { LocalizedString } from "@buildo/bento-design-system";
import enMessages from "./locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { MapLeafNodes } from "./utils/mapLeafNodes";

const enResources = enMessages as MapLeafNodes<typeof enMessages, LocalizedString>;

export const resources = {
  en: enResources,
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    nsMode: "fallback",
  },
});
