const merge = require('webpack-merge');
import {baseConfig, contentBase} from "./webpack.common";

module.exports = merge(baseConfig, {
    output: {
        path: contentBase,
        filename: 'sheets.bundle.dev.js'
    },
    devServer: {
        contentBase: contentBase,
        compress: true,
        port: 1100
    },
    mode: "development",
    watch: true,
});
