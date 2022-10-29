const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require('webpack').container;
const ExternalRemotesPlugin = require("external-remotes-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");

// 打包的进度条
const progressPlugin = new WebpackBar({
    color: '#e51c3a', // 默认green，进度条颜色支持HEX
    basic: false, // 默认true，启用一个简单的日志报告器
    profile: false, // 默认false，启用探查器。
});

// 编译html模板
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './public/index.html',
    title: 'React'
})

// 联邦模式
const moduleFederationPlugin = new ModuleFederationPlugin({
    name: 'react',
    remotes: {
        "reactApp": 'reactApp@http://localhost:3002/remoteEntry.js'
    },
    // shared: {react: {singleton: true, eager: true}, "react-dom": {singleton: true}},
})

// 远程仓库加载技术
const externalRemotesPlugin = new ExternalRemotesPlugin()

// 引入workbox
// const workboxPlugin = new WorkboxPlugin.GenerateSW({
//     clientsClaim: true,
//     skipWaiting: true,
//     maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
// })

const pathResolve = (filePath) => {
    return path.resolve(__dirname, filePath)
}

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    target: "web",
    devServer: {
        static: pathResolve('dist'),
        port: 3000,
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    plugins: [
        progressPlugin,
        htmlWebpackPlugin,
        moduleFederationPlugin,
        externalRemotesPlugin,
    ]
}
