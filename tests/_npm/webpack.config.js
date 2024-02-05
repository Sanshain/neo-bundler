const path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: 'production',    
    output: {
        path: path.resolve(__dirname, 'webpack'),
        filename: 'app.bundle.js',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    optimization: {
        // minimize: false,
    },
    module: {
        // rules: [
        //     // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        //     { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
        // ]
    }
};