module.exports = (ctx) => ({
    plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        'postcss-mixins': {},
        'postcss-simple-vars': {},
        'postcss-conditionals': {},
        'postcss-cssnext': {},
        'postcss-assets': {
            loadPaths: [
                'public/images/'
            ]
        },
        'cssnano': ctx.env === 'prod' ? {} : false,
        'css-mqpacker': ctx.env === 'prod' ? {} : false
    }
})