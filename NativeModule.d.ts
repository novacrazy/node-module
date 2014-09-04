declare module NativeModule {
    interface INativeModuleSource {
        name: string;
        source: string;
        source_len: number;
    }
    interface INativeModuleStatic {
        require: ( id : string ) => any;
        getCached: ( id : string ) => any;
        exists: ( id : string ) => boolean;
        getSource: ( id : string ) => any;
        wrap: ( script : string ) => string;
        wrapper: string[];
        _source: INativeModuleSource[];
        new( id : string ): INativeModule;
    }
    interface INativeModule {
        filename: string;
        id: string;
        exports: any;
        loaded: boolean;
        compile: () => void;
        cache: () => void;
    }
}
export = NativeModule;
