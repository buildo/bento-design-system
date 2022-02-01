import { IdentifierOption } from '@vanilla-extract/integration';
import type { Plugin } from 'esbuild';
interface VanillaExtractPluginOptions {
    outputCss?: boolean;
    externals?: Array<string>;
    runtime?: boolean;
    processCss?: (css: string) => Promise<string>;
    identifiers?: IdentifierOption;
}
export declare function vanillaExtractPlugin({ outputCss, externals, runtime, processCss, identifiers, }?: VanillaExtractPluginOptions): Plugin;
export {};
