import type { LoaderContext } from './types';
declare type Externals = any;
export declare class ChildCompiler {
    externals: Externals | undefined;
    constructor(externals: Externals);
    isChildCompiler(name: string | undefined): boolean;
    getCompiledSource(loader: LoaderContext): Promise<{
        source: string;
        dependencies: string[];
    }>;
}
export {};
