const commonPaths = require("./common-paths");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
    // Turn on if you need it. But if you use "source-maps" your css will compile in 3 times longer!!!
    // And will be no sense from hot reload
    // devtool: "source-maps",

    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    module: {
        rules: [
            {
                test: /\.pcss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            alias: {
                                // you can use this alias for  background: url("~svg/...") || url("~raster/..."), don't forget to use "~" in your url
                                // but it wouldn't work if you use background: inline("...")
                                // look loadPaths in Plugin postcss-assets
                                svg: commonPaths.svgPath,
                                raster: commonPaths.rasterPath,
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                ]
            }
        ]
    },

    plugins: [
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3002,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:8080/)
                // through BrowserSync
                proxy: 'http://localhost:8080/'
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: true
            }
        )
    ]
};

module.exports = config;