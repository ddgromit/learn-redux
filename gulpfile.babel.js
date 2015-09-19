import gulp from 'gulp';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import { webpackDevConfig } from './tools/webpack/config';

gulp.task('default', function() {
  var compiler = webpack(webpackDevConfig);
  new WebpackDevServer(compiler, {
    noInfo: false,
    historyApiFallback: true,
    contentBase: './tools/webpack',
    publicPath: '/dist/',
  }).listen(8080, "localhost", function(err) {
    if(err) throw err;
    console.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});
