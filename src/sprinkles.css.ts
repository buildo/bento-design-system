import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
  createNormalizeValueFn,
  ConditionalValue,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { breakpoints } from "./util/breakpoints";
import { vars } from "./vars.css";

export function defineUnconditionalProperties<T extends {}>(customFontFamilies: T) {
  return defineProperties({
    properties: {
      fontFamily: {
        ...vars.fontFamily,
        ...customFontFamilies,
      },
    },
  });
}

export function defineResponsiveProperties<T>(customSpaces: T) {
  const spaces = {
    ...vars.space,
    ...customSpaces,
  };
  return defineProperties({
    conditions: breakpoints,
    defaultCondition: "desktop",
    properties: {
      display: ["flex", "none", "block"],
      flexDirection: ["row", "column"],
      alignItems: {
        flexStart: "flex-start",
        center: "center",
        flexEnd: "flex-end",
      },
      justifyContent: {
        flexStart: "flex-start",
        center: "center",
        flexEnd: "flex-end",
      },
      flexWrap: {
        nowrap: "nowrap",
        wrap: "wrap",
        wrapReverse: "wrap-reverse",
      },
      flexShrink: [0],
      paddingTop: spaces,
      paddingBottom: spaces,
      paddingLeft: spaces,
      paddingRight: spaces,
      gap: spaces,
    },
    shorthands: {
      padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
      paddingX: ["paddingLeft", "paddingRight"],
      paddingY: ["paddingTop", "paddingBottom"],
    },
  });
}

export function defineStatusProperties<T>(customColors: T) {
  const colors = { ...vars.color, ...customColors };
  return defineProperties({
    conditions: {
      default: {},
      hover: { selector: "&:hover:not(:disabled)" },
      focus: { selector: "&:focus:not(:disabled)" },
      active: { selector: "&:active:not(:disabled)" },
      disabled: { selector: "&:disabled, &[disabled], :disabled &, [disabled] &" },
    },
    defaultCondition: "default",
    properties: {
      color: colors,
      background: colors,
    },
  });
}

const unconditionalProperties = defineUnconditionalProperties({});
const statusProperties = defineStatusProperties({});
const responsiveProperties = defineResponsiveProperties({});

export const sprinkles = createSprinkles(
  unconditionalProperties,
  statusProperties,
  responsiveProperties
);
export type Sprinkles = Parameters<typeof sprinkles>[0];

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export const normalizeResponsiveValue = createNormalizeValueFn(responsiveProperties);

export type OptionalResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;

export type RequiredResponsiveValue<Value extends string | number> = RequiredConditionalValue<
  typeof responsiveProperties,
  Value
>;
