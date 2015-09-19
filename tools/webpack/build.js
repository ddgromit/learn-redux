import webpack from 'webpack';
import { webpackProdConfig } from './config';

export function buildForProduction() {
  return new Promise(function(resolve, reject) {
    webpack(webpackProdConfig, function(err, stats) {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}
