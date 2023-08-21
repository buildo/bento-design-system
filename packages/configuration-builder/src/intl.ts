import { LocalizedString } from "@buildo/bento-design-system";
import enMessages from "./locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type Primitive = string | boolean | number | null | undefined;
type MapLeafNodes<Obj, LeafType> = {
  [Prop in keyof Obj]: Obj[Prop] extends Primitive
    ? LeafType
    : Obj[Prop] extends Record<string | number, any>
    ? MapLeafNodes<Obj[Prop], LeafType>
    : never;
};

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
