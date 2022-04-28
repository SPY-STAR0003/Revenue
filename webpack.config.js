// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static : {
          directory : path.join(__dirname , "dist")  
        },
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test : /\.css$/,
                use : [isProduction ? stylesHandler : "style-loader" , "css-loader"]
            },
            {
                test : /\.s[ac]ss$/,
                use : [isProduction ? stylesHandler : "style-loader" , "css-loader" , "sass-loader"]
            }
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.output.filename = "[name].[contenthash].js";
        
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename : '[name].[contenthash].css'
            })
        )
        
    } else {
        config.mode = 'development';
    }

    config.module.rules.push(...[

    ])
    return config;
};

console.log(config.module.rules)
