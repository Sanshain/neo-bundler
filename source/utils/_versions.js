// export const version = Date.now();

exports.version = Date.now()

// exports.version = new Date().getTime()

const statHolder = {
    imports: 0,    
    requires: 0,
    dynamicImports: 0,
    exports: {
        cjs: 0
    },
    get importsAmount() {
        return this.imports + this.requires
    },
    rebuilds: 0
}

exports.statHolder = statHolder;