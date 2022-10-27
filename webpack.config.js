const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

// 打包的进度条
const progressPlugin = new WebpackBar({
	color: '#e59e1c', // 默认green，进度条颜色支持HEX
	basic: false, // 默认true，启用一个简单的日志报告器
	profile: false, // 默认false，启用探查器。
});

module.exports = function (env, argv) {
	return {
		// 开发中模式
		mode: env.production ? 'production' : 'development',
		target: 'web', // 打包之后的运行， node和web
		// 入口文件
		entry: {
			main: './src/index.js',
		},
		// 出口文件
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js', // name占位符来确保名字是唯一的
		},
		// 使用loader进行类型的转换（test是需要编译的文件类型，use是表示需要使用某种loader进行转换）
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
				}
			],
		},
		// ProgressPlugin进度插件，自定义进度条
		plugins: [
			progressPlugin,
			new HtmlWebpackPlugin({ template: './public/index.html' }),
		],
	};
};
