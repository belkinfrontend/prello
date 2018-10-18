const path = require('path');

module.exports = {
    mode: 'development',

    entry: './source/js/main.js',
    output: {
        filename: 'bundle.js',
        //path: path.resolve(__dirname, './source/js')
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}








// module.exports = {
//     output: { 
//       filename: 'bundle.js',
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           exclude: /(node_modules)/,
//           loader: 'babel-loader',
//           query: {
//             presets: [
//               ['latest', { modules: false }],
//             ],
//           },
//         },
//       ],
//     },
//   };