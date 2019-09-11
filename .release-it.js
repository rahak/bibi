const package = require('./package.json');
const version = 'v' + package.version;
const artifact = 'archives/' + package.name + '-' + version + '.zip';

module.exports = {
    git: {
        commit: false,
        tag: false,
        requireUpstream: false,
        push: false,
        tagName: version
    },
    github: {
        release: true,
        releaseName: version,
        assets: [artifact],
        releaseNotes: `node -pe "require('fs').readFileSync('CHANGELOG.md', 'utf8').split(/(?:\\n)?\\d+\\.\\d+\\.\\d+(?:(?:-|\\+).*)?\\n-+\\n(?:\\n)?/g)[1]"`,
        tokenRef: 'PEGASUS_CI_GITHUB_TOKEN'
    },
    npm: false
};