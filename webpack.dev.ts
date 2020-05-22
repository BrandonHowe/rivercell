const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.ts');
const path = require("path");

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'sheets.bundle.dev.js'
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 1100
    // },
    mode: "development",
    watch: true,
});
