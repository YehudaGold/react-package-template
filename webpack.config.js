const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line max-lines-per-function
module.exports = (env, options = {}) => ({
    devtool: options.mode === 'production' ? 'source-map' : 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        hot: true,
        compress: true,
        open: true,
        port: 8080,
        overlay: true
    },
    entry: './example/src/App.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/u,
                use: 'babel-loader',
                exclude: /node_modules/u
            },
            {
                test: /\.(less|css)$/u,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|eot|svg|ttf|woff|woff2)$/u,
                use: [{loader: 'url-loader'}]
            }
        ]
    },
    output: {
        path: path.resolve('example/dist'),
        filename: '[name].bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        favicon: './example/src/favicon.ico',
        filename: './index.html',
        inject: true,
        template: './example/src/index.html'
    })],
    resolve: {extensions: ['.js', '.jsx']}
});