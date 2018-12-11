var entry = './Course/src/app.js';
//var uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: entry, //入口文件
    output: {
        path: __dirname + '/Course/bin/',
        filename: 'main.[chunkhash].js' //出口文件
        // filename: 'main.js' //出口文件
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
//    plugins:[
//         new uglify()
//    ]
//
    
}


