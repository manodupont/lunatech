/**
 * @copyright Copyright 2017-present by AdAlong, Inc.
 */

'use strict';

const exec = require('child_process').execSync;

/* eslint-disable import/no-dynamic-require */
const pkg = require(`${process.cwd()}/package.json`);
/* eslint-enable import/no-dynamic-require */

class BuildInfo {
  static get package() {
    return pkg;
  }

  static get branch() {
    const branch = process.env.CI_BUILD_REF_NAME || exec('git rev-parse --abbrev-ref HEAD');
    return branch.toString('utf8').trim().replace(/[/-]/g, '.');
  }

  static get commitHash() {
    return exec('git rev-parse --short HEAD').toString('utf8').trim();
  }

  static get buildNumber() {
    return process.env.CI_BUILD_ID || process.env.BUILD_NUMBER || '0';
  }

  static get releaseTag() {
    const { branch, commitHash, buildNumber } = BuildInfo;

    return (branch === 'master') ?
      `${pkg.version}-${buildNumber}.${commitHash}` :
      `${pkg.version}-${buildNumber}.${branch}.${commitHash}`;
  }

  static get release() {
    return `${pkg.name}-${BuildInfo.releaseTag}`;
  }
}

module.exports = BuildInfo;
