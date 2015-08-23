/**
 * Inspired by https://github.com/unbug/gitlab-pages-webhook/blob/master/index.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = webhookCallback;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var REPO_PATH = '/repo/';

// Prevent node from crashing
process.on('uncaughtException', function (err) {
  console.error(err);
});

function webhookCallback(data) {
  var repoUrl = data.repository.git_http_url;
  var userName = data.user_name;

  // series of shell command that will execute eventually
  var cmd = [];

  return new Promise(function (resolve, reject) {
    if (data && data.repository && data.repository.name) {
      (function () {
        var projectName = data.repository.name;
        var projectPath = REPO_PATH + projectName;

        // If repo already exist, use `git pull`
        if (_fs2['default'].existsSync(projectPath)) {
          cmd.push('cd ' + projectPath);
          cmd.push('git pull');
        }
        // If not exist, clone
        else {
            cmd.push('cd ' + REPO_PATH);
            cmd.push('git clone ' + repoUrl);
          }

        (0, _child_process.exec)(cmd.join(' && '), function (err, stdout, stderr) {
          !!stdout && console.log('stdout: ' + stdout);
          !!stderr && console.log('stderr: ' + stderr);

          if (err != null) {
            console.log('error: ' + err);
            reject(err);
          } else {
            console.log('Webhook parsed correctly!');
            resolve(projectPath);
          }
        });
      })();
    }
  });
}

module.exports = exports['default'];