import { CSSProperties, StyleRule } from '@vanilla-extract/css';
import { SprinklesFn } from './createSprinkles';
import { SprinklesProperties, ResponsiveArrayConfig } from './types';
export { createNormalizeValueFn, createMapValueFn } from './createUtils';
export type { ConditionalValue, RequiredConditionalValue } from './createUtils';
interface Condition {
    '@media'?: string;
    '@supports'?: string;
    selector?: string;
}
declare type BaseConditions = {
    [conditionName: string]: Condition;
};
declare type AtomicProperties = {
    [Property in keyof CSSProperties]?: Record<string, CSSProperties[Property] | Omit<StyleRule, 'selectors' | '@media' | '@supports'>> | ReadonlyArray<CSSProperties[Property]>;
};
declare type ShorthandOptions<Properties extends AtomicProperties, Shorthands extends {
    [shorthandName: string]: Array<keyof Properties>;
}> = {
    shorthands: Shorthands;
};
declare type UnconditionalAtomicOptions<Properties extends AtomicProperties> = {
    properties: Properties;
};
declare type ResponsiveArrayOptions<Conditions extends {
    [conditionName: string]: Condition;
}, ResponsiveLength extends number> = {
    responsiveArray: ResponsiveArrayConfig<keyof Conditions> & {
        length: ResponsiveLength;
    };
};
declare type ConditionalAtomicOptions<Properties extends AtomicProperties, Conditions extends {
    [conditionName: string]: Condition;
}, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false> = UnconditionalAtomicOptions<Properties> & {
    conditions: Conditions;
    defaultCondition: DefaultCondition;
};
declare type Values<Property, Result> = {
    [Value in Property extends ReadonlyArray<any> ? Property[number] : Property extends Array<any> ? Property[number] : keyof Property]: Result;
};
declare type UnconditionalAtomicStyles<Properties extends AtomicProperties> = {
    conditions: never;
    styles: {
        [Property in keyof Properties]: {
            values: Values<Properties[Property], {
                defaultClass: string;
            }>;
        };
    };
};
declare type ConditionalAtomicStyles<Properties extends AtomicProperties, Conditions extends {
    [conditionName: string]: Condition;
}, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false> = {
    conditions: {
        defaultCondition: DefaultCondition;
        conditionNames: Array<keyof Conditions>;
    };
    styles: {
        [Property in keyof Properties]: {
            values: Values<Properties[Property], {
                defaultClass: DefaultCondition extends false ? undefined : string;
                conditions: {
                    [Rule in keyof Conditions]: string;
                };
            }>;
        };
    };
};
declare type ConditionalWithResponsiveArrayAtomicStyles<Properties extends AtomicProperties, Conditions extends {
    [conditionName: string]: Condition;
}, ResponsiveLength extends number, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false> = {
    conditions: {
        defaultCondition: DefaultCondition;
        conditionNames: Array<keyof Conditions>;
        responsiveArray: Array<keyof Conditions> & {
            length: ResponsiveLength;
        };
    };
    styles: {
        [Property in keyof Properties]: {
            responsiveArray: Array<keyof Conditions> & {
                length: ResponsiveLength;
            };
            values: Values<Properties[Property], {
                defaultClass: DefaultCondition extends false ? undefined : string;
                conditions: {
                    [Rule in keyof Conditions]: string;
                };
            }>;
        };
    };
};
declare type ShorthandAtomicStyles<Shorthands extends {
    [shorthandName: string]: Array<string | number | symbol>;
}> = {
    styles: {
        [Shorthand in keyof Shorthands]: {
            mappings: Shorthands[Shorthand];
        };
    };
};
export declare function defineProperties<Properties extends AtomicProperties, ResponsiveLength extends number, Conditions extends BaseConditions, Shorthands extends {
    [shorthandName: string]: Array<keyof Properties>;
}, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false>(options: ConditionalAtomicOptions<Properties, Conditions, DefaultCondition> & ShorthandOptions<Properties, Shorthands> & ResponsiveArrayOptions<Conditions, ResponsiveLength>): ConditionalWithResponsiveArrayAtomicStyles<Properties, Conditions, ResponsiveLength, DefaultCondition> & ShorthandAtomicStyles<Shorthands>;
export declare function defineProperties<Properties extends AtomicProperties, Conditions extends BaseConditions, Shorthands extends {
    [shorthandName: string]: Array<keyof Properties>;
}, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false>(options: ConditionalAtomicOptions<Properties, Conditions, DefaultCondition> & ShorthandOptions<Properties, Shorthands>): ConditionalAtomicStyles<Properties, Conditions, DefaultCondition> & ShorthandAtomicStyles<Shorthands>;
export declare function defineProperties<Properties extends AtomicProperties, Conditions extends BaseConditions, ResponsiveLength extends number, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false>(options: ConditionalAtomicOptions<Properties, Conditions, DefaultCondition> & ResponsiveArrayOptions<Conditions, ResponsiveLength>): ConditionalWithResponsiveArrayAtomicStyles<Properties, Conditions, ResponsiveLength, DefaultCondition>;
export declare function defineProperties<Properties extends AtomicProperties, Conditions extends BaseConditions, DefaultCondition extends keyof Conditions | Array<keyof Conditions> | false>(options: ConditionalAtomicOptions<Properties, Conditions, DefaultCondition>): ConditionalAtomicStyles<Properties, Conditions, DefaultCondition>;
export declare function defineProperties<Properties extends AtomicProperties, Shorthands extends {
    [shorthandName: string]: Array<keyof Properties>;
}>(options: UnconditionalAtomicOptions<Properties> & ShorthandOptions<Properties, Shorthands>): UnconditionalAtomicStyles<Properties> & ShorthandAtomicStyles<Shorthands>;
export declare function defineProperties<Properties extends AtomicProperties>(options: UnconditionalAtomicOptions<Properties>): UnconditionalAtomicStyles<Properties>;
export declare function createSprinkles<Args extends ReadonlyArray<SprinklesProperties>>(...config: Args): SprinklesFn<Args>;
/** @deprecated - Use `defineProperties` */
export declare const createAtomicStyles: typeof defineProperties;
/** @deprecated - Use `createSprinkles` */
export declare const createAtomsFn: typeof createSprinkles;
