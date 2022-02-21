const path = require('path');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const Webpackbar = require('webpackbar');


// stylelint-webpack-plugin
// copy-webpack-plugin 将已经存在的单个文件或整个目录复制到构建目录
// workbox-webpack-plugin service-worker相关
// fork-ts-checker-notifier-webpack-plugin
// fork-ts-checker-webpack-plugin

// console.log('env :', process.env);

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 根据资源内容创建hash
        filename: '[name].[contenthash:8].js',
        clean: true,
    },
    mode: 'none',
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 省略文件后缀
        alias: { // 配置别名
            '@': path.resolve(__dirname, '../src')
        }
    },
    plugins: [
        // 定义全局变量
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
        }),
        // 打包进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(
                ':precent'
            )} (:elapsed s)`,
        }),
        new Webpackbar()
    ],
    module: {
        rules: [
            // webpack5 内置 资源模块
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'static/img/[name].[hash:7][ext]',
                },
            },
            {
                test: /\.(js|jsx)/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            }
        ],
    },
    // 防止将外部资源打包到自己的bundle中
    externals: {
        jquery: 'jQuery'
    }
};
