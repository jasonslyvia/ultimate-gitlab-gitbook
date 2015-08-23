/**
 * Inspired by https://github.com/unbug/gitlab-pages-webhook/blob/master/index.js
 */
import {spawn, exec} from 'child_process';
import fs from 'fs';

const REPO_PATH = '/repo/';

// Prevent node from crashing
process.on('uncaughtException', (err) => {
  console.error(err);
});


export default function webhookCallback(data) {
  const repoUrl = data.repository.git_http_url;
  const userName = data.user_name;

  // series of shell command that will execute eventually
  const cmd = [];

  if (data && data.repository && data.repository.name) {
    const projectName = data.repository.name;
    const projectPath = REPO_PATH + projectName;

    // If repo already exist, use `git pull`
    if (fs.existsSync(projectPath)) {
      cmd.push(`git pull ${projectPath}`);
      cmd.push('git checkout master && git pull');
    }
    // If not exist, clone
    else {
      cmd.push(`cd ${REPO_PATH}`);
      cmd.push(`git clone ${repoUrl}`);
    }

    exec(cmd.join(' && '), (err, stdout, stderr) => {
      !!stdout && console.log('stdout: ' + stdout);
      !!stderr && console.log('stderr: ' + stderr);

      if (err != null) {
        console.log('error: ' + err);
      }
      else {
        console.log('Done!');
      }
    });
  }
}
