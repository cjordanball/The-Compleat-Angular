'use strict';
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
	// devtool: 'source-map',
	entry: './src/app/main.aot.ts'
	output: {
		path: path.resolve(rootDir, 'dist'),
		publicPath: '/',
		filename: '[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{ loader: 'awesome-typescript-loader' },
					{ loader: 'angular2-template-loader' },
					{ loader: 'angular-router-loader?aot=true' }
				]
			}
		]
	}
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
			mangle: {
				keep_fnames: true
			}
		}),
		new ExtractTextPlugin('[name].[hash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		}),
		new webpack.LoaderOptionsPlugin({
			htmlLoader: {
				minimize: false // workaround for ng2
			}
		})
	]
});
