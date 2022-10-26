const path = require('path')

module.exports = {
    // 开发中模式
    mode: 'development',
    // 入口文件
    entry: {
        main: './src/index.js',
        page1: './src/views/index.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js", // name占位符来确保名字是唯一的
    }
}