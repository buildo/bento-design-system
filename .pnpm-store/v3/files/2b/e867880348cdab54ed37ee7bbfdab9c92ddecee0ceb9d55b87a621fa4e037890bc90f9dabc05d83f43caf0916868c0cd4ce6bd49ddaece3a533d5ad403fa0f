import { Compiler, ExternalsPlugin, Compilation, Module, node, optimize } from 'webpack';
export interface WebpackCompat {
    isWebpack5: boolean;
    getNodeTemplatePlugin: (compiler: Compiler) => typeof node.NodeTemplatePlugin;
    getNodeTargetPlugin: (compiler: Compiler) => typeof node.NodeTargetPlugin;
    getLimitChunkCountPlugin: (compiler: Compiler) => typeof optimize.LimitChunkCountPlugin;
    getExternalsPlugin: (compiler: Compiler) => typeof ExternalsPlugin;
    isModuleUsed: (compilation: Compilation, module: Module) => boolean;
}
declare const _default: (isWebpack5: boolean) => WebpackCompat;
export default _default;
