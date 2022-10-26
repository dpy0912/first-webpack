const path = require('path');

module.exports = {
	// 开发中模式
	mode: 'development',
	// 入口文件
	entry: {
		main: './src/index.js',
		page1: './src/views/index.js',
		css: './src/index.css',
		ts: './src/views/index.ts'
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
				use: 'css-loader',
			},
			{
                test: /\.ts$/,
                use: 'ts-loader'
            },
		],
	},
};
