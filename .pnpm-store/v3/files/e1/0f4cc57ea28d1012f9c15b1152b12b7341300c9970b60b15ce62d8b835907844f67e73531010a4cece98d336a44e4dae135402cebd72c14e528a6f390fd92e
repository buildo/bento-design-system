import { IdentifierOption } from '@vanilla-extract/integration';
import type { Compiler, RuleSetRule } from 'webpack';
import { ChildCompiler } from './compiler';
interface PluginOptions {
    test?: RuleSetRule['test'];
    identifiers?: IdentifierOption;
    outputCss?: boolean;
    externals?: any;
    /** @deprecated */
    allowRuntime?: boolean;
}
export declare class VanillaExtractPlugin {
    test: RuleSetRule['test'];
    outputCss: boolean;
    allowRuntime: boolean;
    childCompiler: ChildCompiler;
    identifiers?: IdentifierOption;
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
}
export {};
