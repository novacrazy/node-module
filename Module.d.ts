declare module "module" {

    interface IModuleStaticInternal {
        _contextLoad: boolean;
        _cache: {
            [x: string]: any;
        };
        _pathCache: {
            [x: string]: string;
        };
        _extensions: {
            [x: string]: any;
        };
        globalPaths: string[];
        wrap: ( script : string ) => string;
        wrapper: string[];
        _debug: ( message? : any ) => void;
        _realpathCache: {
            [x: string]: string;
        };
        _findPath: ( request : string, paths : string[] ) => string;
        _nodeModulePaths: ( from : string ) => string[];
        _resolveLookupPaths: ( request : string, parent : IModule ) => any[];
        _load: ( request : string, parent : IModule, isMain? : boolean ) => any;
        _resolveFilename: ( request : string, parent : IModule ) => string;
        requireRepl: () => any;
        runMain: () => void;
        _initPaths: () => void;
    }

    interface IModuleStatic extends IModuleStaticInternal {
        new ( id? : string, parent? : IModule ): IModule;
    }

    interface IModuleInternal {
        load( filename : string ): void;
        paths: string[];
        _compile( content : string, filename : string ): any;
        loaded: boolean;
    }

    interface IModulePublic {
        filename?: string;
        id: string;
        exports: any;
        require( path : string ): any;
        parent?: IModule;
        children: IModule[];
    }

    interface IModule extends IModuleInternal, IModulePublic {
    }

    export var Module : IModuleStatic;
}
