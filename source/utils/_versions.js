// export const version = Date.now();

exports.version = Date.now()

// exports.version = new Date().getTime()

const statHolder = {
    imports: 0,
    requires: 0,
    dynamicImports: 0,
    get importsAmount() {
        return this.imports + this.requires
    }
}

exports.statHolder = statHolder;