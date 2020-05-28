const merge = require('webpack-merge');
import { baseConfig } from "./webpack.common";

const path = require('path');

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'sheets.bundle.prod.js'
    },
    mode: "production",
});
