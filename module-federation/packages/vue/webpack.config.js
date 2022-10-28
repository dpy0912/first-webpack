const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require('webpack').container;
const {VueLoaderPlugin} = require('vue-loader')

// 打包的进度条
const progressPlugin = new WebpackBar({
    color: '#e51c3a', // 默认green，进度条颜色支持HEX
    basic: false, // 默认true，启用一个简单的日志报告器
    profile: false, // 默认false，启用探查器。
});

// 编译html模板
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './public/index.html',
    title: 'Vue'
})

// 联邦模式
const moduleFederationPlugin = new ModuleFederationPlugin({
    name: 'vue',
    filename: 'remoteEntry.js',
    exposes: {
        './App': './src/App'
    }
})

// vue的loader加载器
const vueLoaderPlugin = new VueLoaderPlugin()

const pathResolve = (filePath) => {
    return path.resolve(__dirname, filePath)
}

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    target: "web",
    devServer: {
        static: pathResolve('dist'),
        port: 3001,
        open: true,
        hot: true,
    },
    output: {
        publicPath: "auto",
        clean: true,
        path: pathResolve('dist'),
        filename: '[name].[contenthash].js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js']
    },
    plugins: [
        progressPlugin,
        htmlWebpackPlugin,
        moduleFederationPlugin,
        vueLoaderPlugin
    ]
}
