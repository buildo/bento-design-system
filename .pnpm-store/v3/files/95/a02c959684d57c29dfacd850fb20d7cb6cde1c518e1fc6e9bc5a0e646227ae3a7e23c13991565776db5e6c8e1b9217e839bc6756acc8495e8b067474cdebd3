export interface ResponsiveArray<Length extends number, Value> extends ReadonlyArray<Value> {
    0: Value;
    length: Length;
}
export interface RequiredResponsiveArray<Length extends number, Value> extends ReadonlyArray<Value> {
    0: Exclude<Value, null>;
    length: Length;
}
export declare type ResponsiveArrayConfig<Value> = ResponsiveArray<2 | 3 | 4 | 5 | 6 | 7 | 8, Value>;
export declare type ResponsiveArrayByMaxLength<MaxLength extends number, Value> = [
    never,
    ResponsiveArray<1, Value | null>,
    ResponsiveArray<1 | 2, Value | null>,
    ResponsiveArray<1 | 2 | 3, Value | null>,
    ResponsiveArray<1 | 2 | 3 | 4, Value | null>,
    ResponsiveArray<1 | 2 | 3 | 4 | 5, Value | null>,
    ResponsiveArray<1 | 2 | 3 | 4 | 5 | 6, Value | null>,
    ResponsiveArray<1 | 2 | 3 | 4 | 5 | 6 | 7, Value | null>,
    ResponsiveArray<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, Value | null>
][MaxLength];
export declare type RequiredResponsiveArrayByMaxLength<MaxLength extends number, Value> = [
    never,
    RequiredResponsiveArray<1, Value | null>,
    RequiredResponsiveArray<1 | 2, Value | null>,
    RequiredResponsiveArray<1 | 2 | 3, Value | null>,
    RequiredResponsiveArray<1 | 2 | 3 | 4, Value | null>,
    RequiredResponsiveArray<1 | 2 | 3 | 4 | 5, Value | null>,
    RequiredResponsiveArray<1 | 2 | 3 | 4 | 5 | 6, Value | null>,
    RequiredResponsiveArray<1 | 2 | 3 | 4 | 5 | 6 | 7, Value | null>,
    RequiredResponsiveArray<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, Value | null>
][MaxLength];
export declare type ConditionalPropertyValue = {
    defaultClass: string | undefined;
    conditions: {
        [conditionName: string]: string;
    };
};
export declare type ConditionalWithResponsiveArrayProperty = {
    responsiveArray: Array<string>;
    values: {
        [valueName: string]: ConditionalPropertyValue;
    };
};
export declare type ConditionalProperty = {
    values: {
        [valueName: string]: ConditionalPropertyValue;
    };
};
export declare type UnconditionalProperty = {
    values: {
        [valueName: string]: {
            defaultClass: string;
        };
    };
};
export declare type ShorthandProperty = {
    mappings: Array<string>;
};
export declare type SprinklesProperties = {
    styles: {
        [property: string]: ConditionalWithResponsiveArrayProperty | ConditionalProperty | ShorthandProperty | UnconditionalProperty;
    };
};
/** @deprecated - Use `SprinklesProperties` */
export declare type AtomicStyles = SprinklesProperties;
