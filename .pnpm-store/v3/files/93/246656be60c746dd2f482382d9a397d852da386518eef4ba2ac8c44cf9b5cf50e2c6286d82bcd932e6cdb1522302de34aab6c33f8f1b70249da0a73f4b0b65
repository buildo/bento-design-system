import { BuildOptions, Plugin as Plugin$1, Loader } from 'esbuild';
import { InputOption } from 'rollup';
import { RawSourceMap } from 'source-map';

/** Mark some properties as required, leaving others unchanged */
declare type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> & Required<Pick<T, RK>>;

declare type Logger = ReturnType<typeof createLogger>;
declare const createLogger: (name?: string | undefined) => {
    setName(_name: string): void;
    success(label: string, ...args: any[]): void;
    info(label: string, ...args: any[]): void;
    error(label: string, ...args: any[]): void;
    warn(label: string, ...args: any[]): void;
    log(label: string, type: 'info' | 'success' | 'error' | 'warn', ...data: unknown[]): void;
};

declare type ChunkInfo = {
    type: 'chunk';
    code: string;
    map?: string | RawSourceMap | null;
    path: string;
    /**
     * Sets the file mode
     */
    mode?: number;
};
declare type MaybePromise<T> = T | Promise<T>;
declare type RenderChunk = (this: PluginContext, code: string, chunkInfo: ChunkInfo) => MaybePromise<{
    code: string;
    map?: object | string;
} | undefined | null | void>;
declare type BuildStart = (this: PluginContext) => MaybePromise<void>;
declare type BuildEnd = (this: PluginContext, ctx: {
    writtenFiles: WrittenFile[];
}) => MaybePromise<void>;
declare type ModifyEsbuildOptions = (this: PluginContext, options: BuildOptions) => void;
declare type Plugin = {
    name: string;
    esbuildOptions?: ModifyEsbuildOptions;
    buildStart?: BuildStart;
    renderChunk?: RenderChunk;
    buildEnd?: BuildEnd;
};
declare type PluginContext = {
    format: Format;
    splitting?: boolean;
    options: NormalizedOptions;
    logger: Logger;
};
declare type WrittenFile = {
    readonly name: string;
    readonly size: number;
};

declare type Format = 'cjs' | 'esm' | 'iife';
declare type DtsConfig = {
    entry?: InputOption;
    /** Resolve external types used in dts files from node_modules */
    resolve?: boolean | (string | RegExp)[];
    /** Emit declaration files only */
    only?: boolean;
    /** Insert at the top of each output .d.ts file  */
    banner?: string;
    /** Insert at the bottom */
    footer?: string;
};
/**
 * The options available in tsup.config.ts
 * Not all of them are available from CLI flags
 */
declare type Options = {
    /** Optional config name to show in CLI output */
    name?: string;
    /**
     * @deprecated Use `entry` instead
     */
    entryPoints?: BuildOptions['entryPoints'];
    entry?: BuildOptions['entryPoints'];
    /**
     * Output different formats to different folder instead of using different extensions
     */
    legacyOutput?: boolean;
    /**
     * Compile target
     *
     * default to `node12`
     */
    target?: string | string[];
    minify?: boolean;
    minifyWhitespace?: boolean;
    minifyIdentifiers?: boolean;
    minifySyntax?: boolean;
    keepNames?: boolean;
    watch?: boolean | string | (string | boolean)[];
    ignoreWatch?: string[] | string;
    onSuccess?: string;
    jsxFactory?: string;
    jsxFragment?: string;
    outDir?: string;
    format?: Format[];
    globalName?: string;
    env?: {
        [k: string]: string;
    };
    define?: {
        [k: string]: string;
    };
    dts?: boolean | string | DtsConfig;
    sourcemap?: boolean | 'inline';
    /** Always bundle modules matching given patterns */
    noExternal?: (string | RegExp)[];
    /** Don't bundle these modules */
    external?: (string | RegExp)[];
    /**
     * Replace `process.env.NODE_ENV` with `production` or `development`
     * `production` when the bundled is minified, `development` otherwise
     */
    replaceNodeEnv?: boolean;
    /**
     * Code splitting
     * Default to `true`
     * You may want to disable code splitting sometimes: #255
     */
    splitting?: boolean;
    /**
     * Clean output directory before each build
     */
    clean?: boolean | string[];
    esbuildPlugins?: Plugin$1[];
    esbuildOptions?: (options: BuildOptions, context: {
        format: Format;
    }) => void;
    /**
     * Suppress non-error logs (excluding "onSuccess" process output)
     */
    silent?: boolean;
    /**
     * Skip node_modules bundling
     */
    skipNodeModulesBundle?: boolean;
    /**
     * @see https://esbuild.github.io/api/#pure
     */
    pure?: string | string[];
    /**
     * Disable bundling, default to true
     */
    bundle?: boolean;
    /**
     * This option allows you to automatically replace a global variable with an import from another file.
     * @see https://esbuild.github.io/api/#inject
     */
    inject?: string[];
    /**
     * Emit esbuild metafile
     * @see https://esbuild.github.io/api/#metafile
     */
    metafile?: boolean;
    footer?: BuildOptions['footer'];
    banner?: BuildOptions['banner'];
    /**
     * Target platform
     * @default `node`
     */
    platform?: 'node' | 'browser';
    /**
     * Esbuild loader option
     */
    loader?: Record<string, Loader>;
    /**
     * Disable config file with `false`
     */
    config?: boolean;
    /**
     * Use a custom tsconfig
     */
    tsconfig?: string;
    /**
     * Inject CSS as style tags to document head
     * @default {false}
     */
    injectStyle?: boolean;
    /**
     * Inject cjs and esm shims if needed
     * @default {true}
     */
    shims?: boolean;
    /**
     * TSUP plugins
     * @experimental
     * @alpha
     */
    plugins?: Plugin[];
};

declare type NormalizedOptions = Omit<MarkRequired<Options, 'entry' | 'format' | 'outDir'>, 'dts'> & {
    dts?: DtsConfig;
    tsconfigResolvePaths: Record<string, string[]>;
    tsconfigDecoratorMetadata?: boolean;
};
declare const defineConfig: (options: Options | Options[] | ((overrideOptions: Options) => Options | Options[])) => Options | Options[] | ((overrideOptions: Options) => Options | Options[]);
declare function build(_options: Options): Promise<void>;

export { Format, NormalizedOptions, Options, build, defineConfig };
