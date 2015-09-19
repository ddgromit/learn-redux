import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import { webpackDevConfig } from './config';
console.log(webpackDevConfig);
export function startWebpackDevServer(hot = true) {
  return new Promise(function(resolve, reject) {
    var compiler = webpack(webpackDevConfig);
    new WebpackDevServer(compiler, {
      noInfo: false,
      historyApiFallback: true,
      contentBase: './tools/webpack',
      publicPath: '/dist/',
      hot: hot,
    }).listen(8080, "localhost", function(err) {
      if (err) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
