const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express();
const config = require('./webpack.config.js')
const compiler = webpack(config)

// 使用服务器中间件
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

// 监听端口，启动服务
app.listen(3000, () => {
    console.log('Example app listening on port 3000!\n');
})
