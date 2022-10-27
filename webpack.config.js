const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

// 打包的进度条
const progressPlugin = new WebpackBar({
    color: '#e59e1c', // 默认green，进度条颜色支持HEX
    basic: false, // 默认true，启用一个简单的日志报告器
    profile: false, // 默认false，启用探查器。
});

module.exports = {
    // 开发中模式
    mode: process.env.production ? 'production' : 'development',
    target: 'web', // 打包之后的运行， node和web
    // 入口文件
    entry: {
        index: {
            import: './src/index.js',
            // 防止重复，共享
            // dependOn: 'shared'
        },
        print: {
            import: './src/print.js',
            // 防止重复，共享
            // dependOn: 'shared'
        },
        // 共享的工具库
        // shared: 'lodash',
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', // name占位符来确保名字是唯一的
        clean: true, // 每次build之前都出执行清除输出文件的操作
        // 公共的服务目录
        publicPath: "/",
    },
    // 使用loader进行类型的转换（test是需要编译的文件类型，use是表示需要使用某种loader进行转换）
    // 工具库
    devtool: process.env.production ? null : 'inline-source-map',
    // 服务启动（启动一个静态的本地服务）
    devServer: {
        // 静态目录
        static: './dist',
        // 模块热更新
        hot: true,
    },
    // 优化
    optimization: {
        runtimeChunk: 'single',
        // 模块的id（缓存作用）
        moduleIds: 'deterministic',
        // 切割块
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all"
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            // {
            // 	test: /\.(js|jsx)$/,
            // 	use: 'babel-loader',
            // },
            // 加载图片
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            // cvs格式
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            // xml格式
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.toml$/i,
                type: "json",
                parser: {
                    parse: toml.parse,
                }
            },
            {
                test: /\.yaml$/i,
                type: "json",
                parser: {
                    parse: yaml.parse,
                }
            },
            {
                test: /\.json5$/i,
                type: "json",
                parser: {
                    parse: json5.parse,
                }
            }
        ],
    },
    // ProgressPlugin进度插件，自定义进度条
    plugins: [
        progressPlugin,
        new HtmlWebpackPlugin({template: './public/index.html', title: "Caching"}),
    ],
};
