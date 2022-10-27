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

module.exports = function (env, argv) {
	return {
		// 开发中模式
		mode: env.production ? 'production' : 'development',
		target: 'web', // 打包之后的运行， node和web
		// 入口文件
		entry: {
			index: './src/index.js',
			print: './src/print.js'
		},
		// 出口文件
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js', // name占位符来确保名字是唯一的
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
			new HtmlWebpackPlugin({ template: './public/index.html', title: "first webpack"}),
		],
	};
};
