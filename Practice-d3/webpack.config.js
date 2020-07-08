const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const packageName = 'colormap';
var BUILD_PATH = path.resolve(__dirname, 'dist');
module.exports = {
    entry: `./src/${packageName}/index.js`,
    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new htmlWebpackPlugin({ 
            template: path.join(__dirname, `./src/${packageName}/index.html`), 
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
                include: path.resolve(__dirname, './src/css')
            }
        ]
    },
    devServer: { 
        open: true, 
        port: 3000
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_PATH
    }
};