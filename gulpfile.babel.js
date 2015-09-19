import gulp from 'gulp';
import { startWebpackDevServer } from './tools/webpack/dev-server';

gulp.task('default', function() {
  startWebpackDevServer().then(() => {
    console.log('webpack started');
  }).catch(() => {
    console.log("Couldn't start webpack");
  });
});
