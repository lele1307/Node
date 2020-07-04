const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
var BUILD_PATH = path.resolve(__dirname, 'dist');
module.exports = {
    entry: {
        intro:'./bar/index.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new htmlWebpackPlugin({ 
            template: path.join(__dirname, './bar/index.html'), 
            filename: 'index.html'
        })
    ],
    module: {  
        rules: [ 
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            { 
                test: /\.css$/, 
                use: ['style-loader','css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'css')
            }
        ]
    },
    devServer: { 
        open: true, 
        port: 3000, 
        contentBase: 'bar'
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_PATH
    }
};