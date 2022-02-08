import { CSSProperties, StyleRule } from "@vanilla-extract/css";
import {
  ConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { responsiveProperties, statusProperties, unconditionalProperties } from "../util/atoms";
import { breakpoints } from "../util/breakpoints";
import { statusConditions } from "../util/conditions";

declare type AtomicProperties = {
  [Property in keyof CSSProperties]?:
    | Record<string, CSSProperties[Property] | StyleRule>
    | ReadonlyArray<CSSProperties[Property]>;
};
declare type Values<Property, Result> = {
  [Value in Property extends ReadonlyArray<any>
    ? Property[number]
    : Property extends Array<any>
    ? Property[number]
    : keyof Property]: Result;
};
declare type UnconditionalAtomicStyles<Properties extends AtomicProperties> = {
  conditions: never;
  styles: {
    [Property in keyof Properties]: {
      values: Values<
        Properties[Property],
        {
          defaultClass: string;
        }
      >;
    };
  };
};
interface Condition {
  "@media"?: string;
  "@supports"?: string;
  selector?: string;
}
declare type ConditionalAtomicStyles<
  Properties extends AtomicProperties,
  Conditions extends {
    [conditionName: string]: Condition;
  },
  DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false
> = {
  conditions: {
    defaultCondition: DefaultCondition;
    conditionNames: Array<keyof Conditions>;
  };
  styles: {
    [Property in keyof Properties]: {
      values: Values<
        Properties[Property],
        {
          defaultClass: DefaultCondition extends false ? undefined : string;
          conditions: {
            [Rule in keyof Conditions]: string;
          };
        }
      >;
    };
  };
};
declare type ShorthandAtomicStyles<
  Shorthands extends {
    [shorthandName: string]: Array<string | number | symbol>;
  }
> = {
  styles: {
    [Shorthand in keyof Shorthands]: {
      mappings: Shorthands[Shorthand];
    };
  };
};

export const unconditionalAtomicProperties: UnconditionalAtomicStyles<
  typeof unconditionalProperties
> = defineProperties({
  properties: unconditionalProperties,
});

const shorthands = {
  padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
  paddingX: ["paddingLeft", "paddingRight"],
  paddingY: ["paddingTop", "paddingBottom"],
};

const responsiveAtomicProperties: ConditionalAtomicStyles<
  typeof responsiveProperties,
  typeof breakpoints,
  "desktop"
> &
  ShorthandAtomicStyles<typeof shorthands> = defineProperties({
  properties: responsiveProperties,
  conditions: breakpoints,
  defaultCondition: "desktop",
  shorthands,
} as any) as any;

const statusAtomicProperties: ConditionalAtomicStyles<
  typeof statusProperties,
  typeof statusConditions,
  "default"
> = defineProperties({
  conditions: statusConditions,
  defaultCondition: "default",
  properties: statusProperties,
});

export const bentoSprinkles = createSprinkles(
  unconditionalAtomicProperties,
  statusAtomicProperties,
  responsiveAtomicProperties
);

export type BentoSprinkles = Parameters<typeof bentoSprinkles>[0];

export const mapResponsiveValue = createMapValueFn(responsiveAtomicProperties);

export const normalizeResponsiveValue = createNormalizeValueFn(responsiveAtomicProperties);

export type OptionalResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveAtomicProperties,
  Value
>;

export type RequiredResponsiveValue<Value extends string | number> = RequiredConditionalValue<
  typeof responsiveAtomicProperties,
  Value
>;
