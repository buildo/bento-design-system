import { ResponsiveArrayByMaxLength, RequiredResponsiveArrayByMaxLength } from './types';
declare type ExtractValue<Value extends string | number | Partial<Record<string, string | number>> | ResponsiveArrayByMaxLength<number, string | number | null>> = Value extends ResponsiveArrayByMaxLength<number, string | number | null> ? NonNullable<Value[number]> : Value extends Partial<Record<string, string | number>> ? NonNullable<Value[keyof Value]> : Value;
declare type Conditions<ConditionName extends string> = {
    conditions: {
        defaultCondition: ConditionName | false;
        conditionNames: Array<ConditionName>;
        responsiveArray?: Array<ConditionName>;
    };
};
declare type ExtractDefaultCondition<SprinklesProperties extends Conditions<string>> = SprinklesProperties['conditions']['defaultCondition'];
declare type ExtractConditionNames<SprinklesProperties extends Conditions<string>> = SprinklesProperties['conditions']['conditionNames'][number];
export declare type ConditionalValue<SprinklesProperties extends Conditions<string>, Value extends string | number> = (ExtractDefaultCondition<SprinklesProperties> extends false ? never : Value) | Partial<Record<ExtractConditionNames<SprinklesProperties>, Value>> | (SprinklesProperties['conditions']['responsiveArray'] extends {
    length: number;
} ? ResponsiveArrayByMaxLength<SprinklesProperties['conditions']['responsiveArray']['length'], Value> : never);
declare type RequiredConditionalObject<RequiredConditionName extends string, OptionalConditionNames extends string, Value extends string | number> = Record<RequiredConditionName, Value> & Partial<Record<OptionalConditionNames, Value>>;
export declare type RequiredConditionalValue<SprinklesProperties extends Conditions<string>, Value extends string | number> = ExtractDefaultCondition<SprinklesProperties> extends false ? never : Value | RequiredConditionalObject<Exclude<ExtractDefaultCondition<SprinklesProperties>, false>, Exclude<ExtractConditionNames<SprinklesProperties>, ExtractDefaultCondition<SprinklesProperties>>, Value> | (SprinklesProperties['conditions']['responsiveArray'] extends {
    length: number;
} ? RequiredResponsiveArrayByMaxLength<SprinklesProperties['conditions']['responsiveArray']['length'], Value> : never);
export declare function createNormalizeValueFn<SprinklesProperties extends Conditions<string>>(properties: SprinklesProperties): <Value extends string | number>(value: ConditionalValue<SprinklesProperties, Value>) => Partial<Record<ExtractConditionNames<SprinklesProperties>, Value>>;
export declare function createMapValueFn<SprinklesProperties extends Conditions<string>>(properties: SprinklesProperties): <OutputValue extends string | number | boolean | null | undefined, Value extends ConditionalValue<SprinklesProperties, string | number>>(value: Value, fn: (inputValue: ExtractValue<Value>, key: ExtractConditionNames<SprinklesProperties>) => OutputValue) => Value extends string | number ? OutputValue : Partial<Record<ExtractConditionNames<SprinklesProperties>, OutputValue>>;
export {};
