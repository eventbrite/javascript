/* eslint-disable no-console */
const execSync = require('child_process').execSync;
const packageInfo = require('../package.json');

const name = packageInfo.name;
const version = packageInfo.version;
const tagName = `${name}-v${version}`;

const gitCommands = [
    'git add package.json CHANGELOG.md',
    `git commit --message "Release ${tagName}"`,
    `git tag ${tagName}`,
];
const shellCommand = gitCommands.join(' && ');

// NOTE: The normal npm-version script creates a git tag that's in the form of
// "v1.0.0" which is a problem because we have 3 NPM packages in this one git
// repository. So instead, we'll disable `npm version` from creating that default
// tag and this script will run to do it. This script prepends the package name
// so that when looking at the tags in the repo they will be differentiated.
// It also commits the package.json.

console.log(`Committing ${tagName} of package.json & adding tag`);

execSync(shellCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`execSync error: ${error}`);
        return;
    }

    console.error(stdout);
    console.error(stderr);
});
