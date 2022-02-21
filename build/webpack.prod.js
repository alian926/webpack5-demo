const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 优化和压缩css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

const plugins = [
    new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
    }),
    // gzip压缩, 此例子中只压缩了html,生成了压缩后的gz文件
    // new CompressionPlugin()
];

if (process.env.ANALYZER) {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, {
    mode: 'production',
    plugins,
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                // 从右向左解析
                use: [
                    MiniCssExtractPlugin.loader,
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
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendor',
            cacheGroups: {
                lodash: {
                    name: 'lodash',
                    chunks: 'async',
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 40,
                },
                'async-common': {
                    chunks: 'async', // async：把动态模块打包进vender，非动态模块保持原样（不优化）
                    minChunks: 2,
                    name: 'async-commons',
                    priority: 30,
                },
                commons: {
                    name: 'commons',
                    chunks: 'all', // all：把动态和非动态模块同时进行优化打包，所有模块都扔到vendors.bundle.js里面
                    minChunks: 2,
                    priority: 20,
                },
            },
        },
        minimizer: [new CssMinimizerPlugin()],
    },
});
