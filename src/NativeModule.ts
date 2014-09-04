/**
 * Created by novacrazy on 8/31/14.
 */

/*
 * The NativeModule module is used internally
 * and is NOT defined within running node programs.
 *
 * However, I thought I'd still include the definitions,
 * mostly since they are sort of used in the user-space Module definitions
 *
 * */

module NativeModule {

    export interface INativeModuleSource {
        name : string;
        source : string;
        source_len : number;
    }

    export interface INativeModuleStatic {
        /*
         * Internal require function that loads core library modules
         *
         * It works as follows:
         *
         *   var nativeModule = new NativeModule( id );
         *
         *   nativeModule.cache();
         *   nativeModule.compile();
         *
         *   return nativeModule.exports;
         *
         * */
        require: ( id : string ) => any;

        /*
         * Gets the cached NativeModule exports for id, if any
         *
         * */
        getCached: ( id : string ) => any;

        /*
         * Tests if a NativeModule with id exists
         *
         * */
        exists: ( id : string ) => boolean;

        /*
         * Gets the source for id
         *
         * */
        getSource : ( id : string ) => any;

        /*
         * Wrap the script in NativeModule.wrapper strings
         * */
        wrap : ( script : string ) => string;

        /*
         * Contains a function wrapper for scripts to be placed in,
         * defining things like exports and __dirname and other common globals
         *
         * */
        wrapper : string[]; //Exactly 2 in length

        //Process binding to 'node_natives.h' entries
        _source: INativeModuleSource[];

        new( id : string ) : INativeModule;
    }

    export interface INativeModule {
        //See IModule for these
        filename : string;
        id : string;
        exports : any;
        loaded : boolean;

        /*
         * Function for the module to compile itself
         *
         * */
        compile : () => void;
        /*
         * Function for the module to cache itself
         *
         * */
        cache : () => void;
    }

    /*
     * NativeModule cannot be used in user programs, only internally.
     *
     * This is enforced by Node.js, and is not just a recommendation.
     *
     * Any attempt to require it will always fail.
     *
     * */

    //export var NativeModule : INativeModuleStatic = require('native_module');

}

export = NativeModule;
