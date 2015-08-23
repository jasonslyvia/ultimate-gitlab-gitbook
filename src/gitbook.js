import {exec} from 'child_process';
import fs from 'fs';

function checkGitbook() {
  return new Promise((resolve, reject) => {
    exec('gitbook -V', (err, stdout, stderr) => {
      if (err || stderr || !stdout.match(/\d+\.\d+\.\d+/)) {
        reject();
      }
      else {
        resolve();
      }
    });
  });
}

export function compileGitbook(projectPath) {
  const cmd = [];
  if (!fs.existsSync(projectPath)) {
    return;
  }

  const repoName = projectPath.split('/')[1];

  cmd.push(`cd ${projectPath}`);
  cmd.push(`gitbook build`);
  cmd.push(`mkdir -p /www/${repoName}`);
  cmd.push(`cd _book && cp -R . /www/${repoName}`);

  checkGitbook()
  .then(() => {
    exec(cmd.join(' && '), (err, stdout, stderr) => {
      !!stdout && console.log('stdout: ' + stdout);
      !!stderr && console.log('stderr: ' + stderr);

      if (err) {
        console.error(err);
      }
      else {
        console.log('Gitbook updated!');
      }
    });
  }, () => {
    throw new Error('Please install `gitbook-cli` globally using npm.');
  });

}
