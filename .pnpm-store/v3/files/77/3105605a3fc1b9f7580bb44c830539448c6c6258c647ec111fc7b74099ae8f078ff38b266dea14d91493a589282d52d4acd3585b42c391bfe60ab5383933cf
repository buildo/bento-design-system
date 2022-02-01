import type { ComplexStyleRule } from '@vanilla-extract/css';
declare type RecipeStyleRule = ComplexStyleRule | string;
export declare type VariantDefinitions = Record<string, RecipeStyleRule>;
declare type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T;
export declare type VariantGroups = Record<string, VariantDefinitions>;
export declare type VariantSelection<Variants extends VariantGroups> = {
    [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]>;
};
export declare type PatternResult<Variants extends VariantGroups> = {
    defaultClassName: string;
    variantClassNames: {
        [P in keyof Variants]: {
            [P in keyof Variants[keyof Variants]]: string;
        };
    };
    defaultVariants: VariantSelection<Variants>;
    compoundVariants: Array<[VariantSelection<Variants>, string]>;
};
export interface CompoundVariant<Variants extends VariantGroups> {
    variants: VariantSelection<Variants>;
    style: RecipeStyleRule;
}
export declare type PatternOptions<Variants extends VariantGroups> = {
    base?: RecipeStyleRule;
    variants?: Variants;
    defaultVariants?: VariantSelection<Variants>;
    compoundVariants?: Array<CompoundVariant<Variants>>;
};
export declare type RuntimeFn<Variants extends VariantGroups> = (options?: VariantSelection<Variants>) => string;
export declare type RecipeVariants<RecipeFn extends RuntimeFn<VariantGroups>> = Parameters<RecipeFn>[0];
export {};
