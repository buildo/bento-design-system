import { ResponsiveArrayByMaxLength, ConditionalPropertyValue, SprinklesProperties, ConditionalWithResponsiveArrayProperty, ConditionalProperty, ShorthandProperty, UnconditionalProperty } from './types';
declare type ResponsiveArrayVariant<RA extends {
    length: number;
}, Values extends string | number | symbol> = ResponsiveArrayByMaxLength<RA['length'], Values | null>;
declare type ConditionalStyle<Values extends {
    [key: string]: ConditionalPropertyValue;
}> = (Values[keyof Values]['defaultClass'] extends string ? keyof Values : never) | {
    [Condition in keyof Values[keyof Values]['conditions']]?: keyof Values;
};
declare type ConditionalStyleWithResponsiveArray<Values extends {
    [key: string]: ConditionalPropertyValue;
}, RA extends {
    length: number;
}> = ConditionalStyle<Values> | ResponsiveArrayVariant<RA, keyof Values>;
declare type ChildSprinkleProps<Sprinkles extends SprinklesProperties['styles']> = {
    [Prop in keyof Sprinkles]?: Sprinkles[Prop] extends ConditionalWithResponsiveArrayProperty ? ConditionalStyleWithResponsiveArray<Sprinkles[Prop]['values'], Sprinkles[Prop]['responsiveArray']> : Sprinkles[Prop] extends ConditionalProperty ? ConditionalStyle<Sprinkles[Prop]['values']> : Sprinkles[Prop] extends ShorthandProperty ? Sprinkles[Sprinkles[Prop]['mappings'][number]] extends ConditionalWithResponsiveArrayProperty ? ConditionalStyleWithResponsiveArray<Sprinkles[Sprinkles[Prop]['mappings'][number]]['values'], Sprinkles[Sprinkles[Prop]['mappings'][number]]['responsiveArray']> : Sprinkles[Sprinkles[Prop]['mappings'][number]] extends ConditionalProperty ? ConditionalStyle<Sprinkles[Sprinkles[Prop]['mappings'][number]]['values']> : Sprinkles[Sprinkles[Prop]['mappings'][number]] extends UnconditionalProperty ? keyof Sprinkles[Sprinkles[Prop]['mappings'][number]]['values'] : never : Sprinkles[Prop] extends UnconditionalProperty ? keyof Sprinkles[Prop]['values'] : never;
};
declare type SprinkleProps<Args extends ReadonlyArray<any>> = Args extends [
    infer L,
    ...infer R
] ? (L extends SprinklesProperties ? ChildSprinkleProps<L['styles']> : never) & SprinkleProps<R> : {};
export declare type SprinklesFn<Args extends ReadonlyArray<SprinklesProperties>> = ((props: SprinkleProps<Args>) => string) & {
    properties: Set<keyof SprinkleProps<Args>>;
};
export declare const createSprinkles: <Args extends readonly SprinklesProperties[]>(composeStyles: (classList: string) => string) => (...args: Args) => SprinklesFn<Args>;
export {};
