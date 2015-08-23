/**
 * Inspired by https://github.com/unbug/gitlab-pages-webhook/blob/master/index.js
 */
import {spawn, exec} from 'child_process';
import fs from 'fs';


const REPO_PATH = '/repo';
const HOST = '0.0.0.0';
const PORT = '7728';


// Prevent node from crashing
process.on('uncaughtException', (err) => {
  console.error(err);
});


export default function webhookCallback(data, params) {
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
      cmd.push(`git clone ${repoUrl}`);
    }

    exec(cmd.join(' && '), {cwd: projectPath}, (err, stdout, stderr) => {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);

      if (err != null) {
        console.log('error: ' + err);
      }
      else {
        console.log('Done!');
      }
    });
  }
}
