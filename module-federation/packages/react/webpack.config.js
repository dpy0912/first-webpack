const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        hot: true,
    },
    output: {
        publicPath: "auto",
        clean: true,
        path: pathResolve('dist'),
        filename: '[name][contenthash].js'
    },
    devtool: 'inline-source-map',
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
                    options: {
                        presets: ["@babel/preset-react"],
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        progressPlugin,
        htmlWebpackPlugin
    ]
}
