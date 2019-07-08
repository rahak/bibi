const package = require('./package.json');
const artifact = 'archives/' + package.name + '-v' + package.version + '.zip';

module.exports = {
    git: {
        commit: false,
        tag: false,
        requireUpstream: false,
        push: false,
        tagName: package.version
    },
    github: {
        release: true,
        releaseName: package.version,
        assets: [artifact],
        releaseNotes: `node -pe "require('fs').readFileSync('CHANGELOG.md', 'utf8').split(/(?:\\n)?\\d+\\.\\d+\\.\\d+(?:(?:-|\\+).*)?\\n-+\\n(?:\\n)?/g)[1]"`,
        tokenRef: 'PEGASUS_CI_GITHUB_TOKEN'
    },
    npm: false
};