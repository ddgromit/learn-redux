import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const common = {
    entry: {
      "client-entry": [
        "./src/entries/client-entry.js",
      ],
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
        { test: /\.css$/, loader: "style-loader!css-loader"},
        { test: /\.scss$/, loader: "style-loader!css-loader!autoprefixer!sass-loader"},
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
      root: path.join(__dirname, '../../src'),
      extensions: [
        '',
        '.js',
        '.jsx',
        '.css',
        '.less',
        '.scss',
        '.json'
      ]
    },
};

export const webpackDevConfig = merge(common, {
  entry: {
    "client-entry": [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/dev-server",
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});