const
    webpackMerge = require("webpack-merge"),
    commonConfig = require("./build-utils/webpack.common");

module.exports = (env) => {
    const envConfig = require(`./build-utils/webpack.${env.env}.js`);

    return webpackMerge(commonConfig, envConfig);
};