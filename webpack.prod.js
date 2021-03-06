const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [ new CssMinimizerPlugin(),new TerserPlugin() ]
    },
    output: {
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            { 
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
        }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,               
                type:'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
/*         new MinifyPlugin(), */
        new CleanWebpackPlugin(),
    ]

}
