import replace from 'replace-in-file';

/**
 * Write the version internally in codebase where needed.
 *  String replaced where version string is needed
 *  @param replacements [{src, dest}]
 */
export default function writeHash(stats) {

  // console.log('stats ********************', stats);

  return new Promise((resolve, reject) => {
    const replacements = [
      {
        src: 'main.js',
        dest: stats.match(new RegExp(/main.*.js/))[0]
      },
      {
        src: 'vendors.js',
        dest: stats.match(new RegExp(/vendors.*.js/))[0]
      }
    ];

    return replacements.map((oneReplacement) => {
      const options = {
        // Glob(s)
        files: [
          './build/public/index.html'
        ],
        // Replacement to make (string or regex)
        from: oneReplacement.src,
        to: oneReplacement.dest,
      };

      try {
        const changedFiles = replace.sync(options);
        console.log('Modified files:', changedFiles.join(', '));
      } catch (error) {
        console.error('Error occurred:', error);
      }
    });
  })
}
