const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
    let serverFile = argv.mode === 'development' ? './src/server/dev.js' : './src/server/prod.js';
    return {
        entry: {
            server: serverFile
        },
        output: {
            path: __dirname + '/public',
            publicPath: '/',
            filename: '[name].js'
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    }
}
