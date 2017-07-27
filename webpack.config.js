const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	// in tutorial (no views folder):
	// template: __dirname + '/app/index.html'
	template: __dirname + '/app/views/index.html',
	filename: 'index.html'
	// When HTMLWebpackPlugin creates a new HTML file, that new HTML file will contain a <script> tag linking to webpack's new JavaScript file. This <script> tag can appear in either the HTML file's <head> or <body>. 
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/app/index.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build'
	},
	plugins: [HTMLWebpackPluginConfig]
};