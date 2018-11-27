/**
 * AdAlong Inc.
 *
 * @author : Manuel Dupont <manuel@adalong.com>
 */
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import writeHash from "./version";

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig.stats));

      return writeHash(stats.toString(webpackConfig.stats))
        .then(() => {
          return resolve();
        })
    });
  });
}

export default bundle;
