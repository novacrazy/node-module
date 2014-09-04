declare module Module {
    interface HashTable<T> {
        [key: string]: T;
    }
    interface IModuleStaticInternal {
        _contextLoad: boolean;
        _cache: HashTable<any>;
        _pathCache: HashTable<string>;
        _extensions: HashTable<any>;
        globalPaths: string[];
        wrap: ( script : string ) => string;
        wrapper: string[];
        _debug: ( message? : any ) => void;
        _realpathCache: HashTable<string>;
        _findPath: ( request : string, paths : string[] ) => string;
        _nodeModulePaths: ( from : string ) => string[];
        _resolveLookupPaths: ( request : string, parent : IModule ) => any[];
        _load: ( request : string, parent : IModule, isMain : boolean ) => any;
        _resolveFilename: ( request : string, parent : IModule ) => string;
        requireRepl: () => any;
        runMain: () => void;
        _initPaths: () => void;
    }
    interface IModuleStatic extends IModuleStaticInternal {
        new( id? : string, parent? : IModule ): IModule;
    }
    interface IModuleInternal {
        load( filename : string ): void;
        paths: string[];
        _compile( content : string, filename : string ): any;
        loaded: boolean;
    }
    interface IModule extends IModuleInternal {
        filename?: string;
        id: string;
        exports: any;
        require( path : string ): any;
        parent?: IModule;
        children: IModule[];
    }
}
export = Module;
