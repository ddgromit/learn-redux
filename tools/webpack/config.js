export const webpackDevConfig = {
    entry: {
      "client-entry": "./src/entries/client-entry.js",
    },

    output: {
      path: (__dirname + '/dist'),
      filename: 'bundle.[name].js',
      publicPath: '/dist/'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)|(bootstrap.*\.js)/,
          loader: 'babel-loader',
          query: {
            stage: 0
          }
        },
        { test: /\.coffee$/, loader: 'coffee-loader' },
        { test: /\.ejs$/, loader: 'ejs-loader' },
        { test: /\.css$/, loader: "style-loader!css-loader"},
        { test: /\.less$/, loader: "style-loader!css-loader!autoprefixer!less-loader"},
        { include: /\.json$/, loaders: ["json-loader"]},

        // Bootstrap fonts
        { test: /\.woff[2]?(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=image/svg+xml" }
      ],
      preLoaders: [
        {test: /\.js$/, loader: "eslint-loader", exclude: [/node_modules/,/vendor/]}
      ]
    },

    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.less',
        '.css',
        '.json'
      ]
    },
};
