/**
 * Created by novacrazy on 8/31/14.
 */

/// <reference path="typings/tsd.d.ts" />


/*
 * These are type definitions for the internal (mostly) 'module' module.
 *
 * The general process for creating a new module and populating it with a script goes as follows:
 *
 *   var Module = require('module');
 *
 *   var script = new Module('script', module);
 *
 *   script._load('scripts/script.js');
 *
 *   //script.js has been loaded into 'script.exports'
 *   script.exports.someFunction();
 *
 *
 * And if you want to reload the script:
 *
 *   //Prime it to be reloaded
 *   script.loaded = false;
 *
 *   script._load('script/other_script.js');
 *
 *   //other_script.js has been loaded into 'script.exports'
 *   script.export.someOtherFunction();
 *
 *
 * So that's some nice exploitation of the internal module system,
 * and it even takes care of all that neat safety stuff.
 *
 * */

module Module {

    export interface HashTable<T> {
        [key : string] : T;
    }

    export interface IModuleStaticInternal {

        /*
         * If true, it loads the module in its own context,
         * otherwise it gives it the global context.
         *
         * Set the environment variable NODE_MODULE_CONTEXTS=1
         * to set this to true.
         *
         * */
        _contextLoad: boolean;

        /*
         * Caches loaded modules so it doesn't have to recompile them.
         *
         * However, this means if you need to dynamically reload a module at runtime,
         * the Node 'require' will not suffice.
         *
         * */
        _cache: HashTable<typeof module.exports>;

        /*
         * Stores paths to already loaded or found modules,
         * reducing search time for future calls
         *
         * */
        _pathCache: HashTable<string>;

        /*
         * Can sometimes be used to load in different file types and convert them to JavaScript
         * before executing them.
         *
         * */
        _extensions: HashTable<any>;

        /*
         * Array of search paths for node modules,
         *
         * Set by _initPaths
         *
         * */
        globalPaths: string[];

        //Alias for NativeModule.wrap
        wrap: ( script : string ) => string;

        //Alias for NativeModule.wrapper
        wrapper: string[];

        /*
         * If process.env.NODE_DEBUG is set and includes the word 'module',
         * this function is set to log a message to stderr.
         *
         * Otherwise, it does nothing.
         *
         * */
        _debug: ( message? : any ) => void;

        /*
         * Similar to _pathCache, but caches 'real' paths,
         * as in accounting for symlinks and anything else.
         *
         * */
        _realpathCache: HashTable<string>;

        /*
         * Sort of recursively searches for a module,
         * returns false if it wasn't found.
         *
         * Also sets an entry in _pathCache if found.
         *
         * */
        _findPath: ( request : string, paths : string[] ) => string;
        _findPath: ( request : string, paths : string[] ) => boolean;

        /*
         * Finds node modules relative to __dirname
         *
         * */
        _nodeModulePaths: ( from : string ) => string[];

        /*
         * If possible, returns an array with the to and from relative to absolute paths
         *
         * */
        _resolveLookupPaths: ( request : string, parent : IModule ) => any[];

        /*
         * Basically the core of require,
         * reads in the file and compiles it, but uses the _cache entry if available
         *
         * */
        _load: ( request : string, parent : IModule, isMain : boolean ) => typeof module.exports;

        /*
         * Finds the absolute path of the requested module script
         *
         * */
        _resolveFilename: ( request : string, parent : IModule ) => string;

        /*
         * Run by Node whenever the Repl module is required,
         * such as with the actual Node REPL
         *
         * */
        requireRepl: () => typeof module.exports;

        /*
         * Run by Node after Node starts up,
         * executing the script given by process.argv[1]
         *
         * */
        runMain: () => void;

        /*
         * First run when starting Node,
         * this finds all the 'node_modules' search paths
         *
         * */
        _initPaths: () => void;
    }

    export interface IModuleStatic extends IModuleStaticInternal {
        /*
         * Creates a new Module instance with the set ID and parent module, if any.
         *
         * */
        new( id? : string, parent? : IModule ) : IModule;
    }

    export interface IModuleInternal {
        /*
         * If not loaded (as dictated by this.loaded),
         * loads in file and takes care of formatting, BOM and other stuff
         * in preparation for compilation.
         *
         * */
        load: ( filename : string ) => void;

        /*
         * Value returned by Module._nodeModulePaths(path.dirname(this.filename))
         *
         * */
        paths: string[];

        /*
         * Compiles (and runs, technically) the script given as 'content' with a proper filename,
         * usually this.filename
         *
         * */
        _compile: ( content : string, filename : string ) => any;

        /*
         * True if loaded, simple as that.
         *
         * */
        loaded : boolean;
    }

    export interface IModule extends IModuleInternal {
        /*
         * Filename of module, if any.
         *
         * */
        filename? : string;

        /*
         * ID string given to the module. Usually unique.
         *
         * */
        id : string;

        /*
         * exports object provided to the loaded script, and edited by it.
         *
         * */
        exports : typeof module.exports;

        /*
         * Bound require function to this module.
         *
         * */
        require: ( path : string ) => typeof module.exports;

        /*
         * Reference to parent module, if any.
         *
         * */
        parent? : IModule;

        /*
         * Array of child modules.
         * Populated automatically if acceptable.
         *
         * */
        children : IModule[];
    }

    //Also happens to match the backwards compatibility in the 'module' module
    export var Module : IModuleStatic = <any>require( 'module' );
}

export = Module;
