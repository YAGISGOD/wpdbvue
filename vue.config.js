module.exports = {
    publicPath: './',
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        host: "localhost"
    },

    outputDir: 'docs/', //これ

}