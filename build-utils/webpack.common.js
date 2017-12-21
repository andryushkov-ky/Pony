const
    webpack = require('webpack'),
    commonPaths = require("./common-paths"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const
    NODE_ENV = process.env.NODE_ENV || 'dev';

const config = {
    entry: {
        index: ['babel-polyfill', './public/js/index.js']
    },
    output: {
        path: commonPaths.outputPath,
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
        })
    ]
};

module.exports = config;