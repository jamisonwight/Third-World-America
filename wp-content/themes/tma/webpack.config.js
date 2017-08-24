var path = require('path');
var glob = require('glob');

module.exports = {
    entry:  ['babel-polyfill', './src/js/main.js'],
    output: {
      path: path.resolve(__dirname, './dist'),  
      filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'stage-3']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
        ]
    },
    node: {
      fs: "empty"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
            'images': path.resolve(__dirname, './src/assets'),
        }
    }
}
