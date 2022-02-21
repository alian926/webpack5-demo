const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        hot: true,
        open: true,
        compress: true, // 开启gzip
        port: 3000,
        static: {
            // 托管的静态资源文件
            directory: path.join(__dirname, '../public'),
        },
    },
    // 可解决使用postcss-loader,配置borwserslist, 无法更新的bug
    target: 'web',
    plugins:[
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            fix: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                // 从右向左解析
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer'],
                            },
                        },
                    },
                ],
            },
        ],
    },
});
