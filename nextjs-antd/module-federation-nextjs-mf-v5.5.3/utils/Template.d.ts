import { ConcatSource, PrefixSource } from "webpack-sources";
export declare const NUMBER_OF_IDENTIFIER_START_CHARS: number;
export declare const NUMBER_OF_IDENTIFIER_CONTINUATION_CHARS: number;
/**
 * @typedef {Object} RenderManifestOptions
 * @property {Chunk} chunk the chunk used to render
 * @property {string} hash
 * @property {string} fullHash
 * @property {OutputOptions} outputOptions
 * @property {CodeGenerationResults} codeGenerationResults
 * @property {{javascript: ModuleTemplate}} moduleTemplates
 * @property {DependencyTemplates} dependencyTemplates
 * @property {RuntimeTemplate} runtimeTemplate
 * @property {ModuleGraph} moduleGraph
 * @property {ChunkGraph} chunkGraph
 */
/** @typedef {RenderManifestEntryTemplated | RenderManifestEntryStatic} RenderManifestEntry */
/**
 * @typedef {Object} RenderManifestEntryTemplated
 * @property {function(): Source} render
 * @property {string | function(PathData, AssetInfo=): string} filenameTemplate
 * @property {PathData=} pathOptions
 * @property {AssetInfo=} info
 * @property {string} identifier
 * @property {string=} hash
 * @property {boolean=} auxiliary
 */
/**
 * @typedef {Object} RenderManifestEntryStatic
 * @property {function(): Source} render
 * @property {string} filename
 * @property {AssetInfo} info
 * @property {string} identifier
 * @property {string=} hash
 * @property {boolean=} auxiliary
 */
/**
 * @typedef {Object} HasId
 * @property {number | string} id
 */
/**
 * @typedef {function(Module, number): boolean} ModuleFilterPredicate
 */
declare class Template {
    /**
     *
     * @param {Function} fn a runtime function (.runtime.js) "template"
     * @returns {string} the updated and normalized function string
     */
    static getFunctionContent(fn: {
        toString: () => string;
    }): string;
    /**
     * @param {string} str the string converted to identifier
     * @returns {string} created identifier
     */
    static toIdentifier(str: string): string;
    /**
     *
     * @param {string} str string to be converted to commented in bundle code
     * @returns {string} returns a commented version of string
     */
    static toComment(str: string): string;
    /**
     *
     * @param {string} str string to be converted to "normal comment"
     * @returns {string} returns a commented version of string
     */
    static toNormalComment(str: string): string;
    /**
     * @param {string} str string path to be normalized
     * @returns {string} normalized bundle-safe path
     */
    static toPath(str: string): string;
    /**
     * @param {number} n number to convert to ident
     * @returns {string} returns single character ident
     */
    static numberToIdentifier(n: number): string;
    /**
     * @param {number} n number to convert to ident
     * @returns {string} returns single character ident
     */
    static numberToIdentifierContinuation(n: number): string;
    /**
     *
     * @param {string | string[]} s string to convert to identity
     * @returns {string} converted identity
     */
    static indent(s: string | string[]): string;
    /**
     *
     * @param {string|string[]} s string to create prefix for
     * @param {string} prefix prefix to compose
     * @returns {string} returns new prefix string
     */
    static prefix(s: any, prefix: string): string;
    /**
     *
     * @param {string|string[]} str string or string collection
     * @returns {string} returns a single string from array
     */
    static asString(str: any[]): string;
    /**
     * @typedef {Object} WithId
     * @property {string|number} id
     */
    /**
     * @param {WithId[]} modules a collection of modules to get array bounds for
     * @returns {[number, number] | false} returns the upper and lower array bounds
     * or false if not every module has a number based id
     */
    static getModulesArrayBounds(modules: any): false | number[];
    /**
     * @param {ChunkRenderContext} renderContext render context
     * @param {Module[]} modules modules to render (should be ordered by identifier)
     * @param {function(Module): Source} renderModule function to render a module
     * @param {string=} prefix applying prefix strings
     * @returns {Source} rendered chunk modules in a Source object
     */
    static renderChunkModules(renderContext: {
        chunkGraph: any;
    }, modules: any[], renderModule: (arg0: any) => any, prefix?: string): ConcatSource | null;
    /**
     * @param {RuntimeModule[]} runtimeModules array of runtime modules in order
     * @param {RenderContext & { codeGenerationResults?: CodeGenerationResults }} renderContext render context
     * @returns {Source} rendered runtime modules in a Source object
     */
    static renderRuntimeModules(runtimeModules: any, renderContext: {
        codeGenerationResults: any;
        chunk: {
            runtime: any;
        };
        chunkGraph: any;
        dependencyTemplates: any;
        moduleGraph: any;
        runtimeTemplate: {
            supportsArrowFunction: () => any;
        };
    }): ConcatSource;
    /**
     * @param {RuntimeModule[]} runtimeModules array of runtime modules in order
     * @param {RenderContext} renderContext render context
     * @returns {Source} rendered chunk runtime modules in a Source object
     */
    static renderChunkRuntimeModules(runtimeModules: any, renderContext: any): PrefixSource;
}
export default Template;
