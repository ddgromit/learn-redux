import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const rootDir = path.join(__dirname, '../../');

const common = {
    entry: {
      "client-entry": [
        "./src/entries/client-entry.js",
      ],
    },

    output: {
      path: path.join(rootDir, 'dist'),
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
      root: path.join(rootDir, 'src'),
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

export const webpackProdConfig = merge(common, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'ENV_CONSTANTS': {
        'api_server_prefix': JSON.stringify(''),
        'asset_prefix': JSON.stringify('/assets'),
      }
    }),

    // Exit on lint or compile errors to cancel heroku build.
    // Webpack should do this itself but its a bug in 1.10.5
    // https://github.com/webpack/webpack/issues/711
    function () {
      this.plugin('done', function (stats) {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log('Found following error(s):');
          stats.compilation.errors.forEach(function(theError) {
              console.log(theError.error);
          });
          process.exit(1);
        }
      });
    },
  ]
});