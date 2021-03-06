const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const  path = require("path");

const NODE_ENV = process.env.NODE_ENV || 'development'
const isDevelopment = NODE_ENV === 'development'
const { stringify } = JSON

module.exports = {
	entry: './src/scripts/index.js',
    output: {
    	path: './',
        filename: 'index.js',
    },
    watch: isDevelopment,
    watchOptions: {
        aggregateTimeout: 100,
    },
    devtool: isDevelopment ? 'cheap-inline-module-source-map' : null,
    plugins: [
        new webpack.NoErrorsPlugin(),
		new NpmInstallPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: stringify(NODE_ENV),
            LANG: stringify('ru')
        }),
    ],
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
			}
		],
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
			}
		},
		{
			test: /\.jsx$/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
			}
		}]
	},
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		},
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
}

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
            }
        })
    )
}

