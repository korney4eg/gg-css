const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {isProduction, isDevelopment, isTsTranspileOnly, fileRegExp, cwd} = require('./../../config');

const styleLoader = {
    loader: 'style-loader',
    options: {attributes: {class: 'my-css-module'}},
};

const cssLoader = isProduction ? MiniCssExtractPlugin.loader : styleLoader;

module.exports.rules = [
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    configFile: isProduction ? path.join(cwd, 'tsconfig.json') : path.join(cwd, 'tsconfig.dev.json'),
                    // disable type checker for building
                    transpileOnly: isTsTranspileOnly || isProduction,
                },
            },
        ],
    },
    {
        test: fileRegExp,
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 0, // 0 byte
            },
        },
    },
    {
        test: /\.scss$/,
        use: [
            cssLoader,
            'css-modules-typescript-loader',
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDevelopment,
                    modules: {
                        localIdentName: isDevelopment ? '[local]----[hash:6]' : '[hash:6]', // '[local]----[path]--[name]--[hash:6]'
                        // localIdentName: '[local]', // '[local]----[path]--[name]--[hash:6]'
                    },
                },
            },
            {loader: 'sass-loader', options: {sourceMap: isDevelopment}},
        ],
    },
    {
        test: /\.css$/,
        use: [
            cssLoader,
            'css-modules-typescript-loader',
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDevelopment,
                    modules: {
                        localIdentName: '[local]', // '[local]----[path]--[name]--[hash:6]'
                    },
                },
            },
        ],
    },
    {
        test: /\.(txt|md|html)$/i,
        use: 'raw-loader',
    },
];
