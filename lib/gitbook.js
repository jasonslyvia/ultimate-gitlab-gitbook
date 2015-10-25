'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.compileGitbook = compileGitbook;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function checkGitbook() {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)('gitbook -V', function (err, stdout, stderr) {
      if (err || stderr || !stdout.match(/\d+\.\d+\.\d+/)) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

function compileGitbook(projectPath) {
  var cmd = [];
  if (!_fs2['default'].existsSync(projectPath)) {
    return;
  }

  var repoName = projectPath.split('/')[2];

  cmd.push('cd ' + projectPath);
  cmd.push('npm_config_registry=http://registry.npm.alibaba-inc.com gitbook install');
  cmd.push('gitbook build');
  cmd.push('mkdir -p /www/' + _config2['default'][repoName]);
  cmd.push('rm -rf /www/' + _config2['default'][repoName] + '/*');
  cmd.push('cd _book && cp -R . /www/' + _config2['default'][repoName]);

  checkGitbook().then(function () {
    (0, _child_process.exec)(cmd.join(' && '), function (err, stdout, stderr) {
      !!stdout && console.log('stdout: ' + stdout);
      !!stderr && console.log('stderr: ' + stderr);

      if (err) {
        console.error(err);
      } else {
        console.log('Gitbook updated!');
      }
    });
  }, function () {
    throw new Error('Please install `gitbook-cli` globally using npm.');
  });
}