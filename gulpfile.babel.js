import gulp from 'gulp';
import { startWebpackDevServer } from './tools/webpack/dev-server';
import { buildForProduction } from './tools/webpack/build';
import { startServer } from './src/server/server';
import shell from 'gulp-shell';

gulp.task('default', ['dev']);

gulp.task('dev', () => {
  startWebpackDevServer().then(() => {
    console.log('webpack started');
  }).catch(() => {
    console.log("Couldn't start webpack");
  });
});

gulp.task('build', () => {
  return buildForProduction().then((stats) => {
    console.log('Build Finished in', stats.endTime - stats.startTime, 'ms');
  }).catch((err) => {
    throw err;
  });
});

gulp.task('server', () => {
  return startServer().then(() => {
    console.log('Server started');
  }).catch((err) => {
    throw err;
  });
});

gulp.task('postdeploy', ['build', 'server']);

gulp.task('docker:build', shell.task([
  'docker build -t rd .'
]));

gulp.task('docker:dev', ['docker:build'], shell.task([
  'docker run -tP --rm --name rd rd'
]));

gulp.task('docker:stop', shell.task([
  'docker stop rd && docker rm rd'
]));
