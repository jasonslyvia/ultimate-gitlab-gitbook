"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = webhookCallback;
/**
 * Inspired by https://github.com/unbug/gitlab-pages-webhook/blob/master/index.js
 */

var _child_process = require("child_process");

var spawn = _child_process.spawn;
var exec = _child_process.exec;

var fs = _interopRequire(require("fs"));

var REPO_PATH = "/repo";
var HOST = "0.0.0.0";
var PORT = "7728";

// Prevent node from crashing
process.on("uncaughtException", function (err) {
  console.error(err);
});

function webhookCallback(data, params) {
  var repoUrl = data.repository.git_http_url;
  var userName = data.user_name;

  // series of shell command that will execute eventually
  var cmd = [];

  if (data && data.repository && data.repository.name) {
    var projectName = data.repository.name;
    var projectPath = REPO_PATH + projectName;

    // If repo already exist, use `git pull`
    if (fs.existsSync(projectPath)) {
      cmd.push("git pull " + projectPath);
      cmd.push("git checkout master && git pull");
    }
    // If not exist, clone
    else {
      cmd.push("git clone " + repoUrl);
    }

    exec(cmd.join(" && "), { cwd: projectPath }, function (err, stdout, stderr) {
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);

      if (err != null) {
        console.log("error: " + err);
      } else {
        console.log("Done!");
      }
    });
  }
}