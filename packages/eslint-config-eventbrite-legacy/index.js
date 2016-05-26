module.exports = {
    extends: ['eslint:recommended'].concat([
        './rules/best-practices',
        './rules/errors',
        './rules/node',
        './rules/style',
        './rules/variables'
    ].map(require.resolve)),
    env: {
        'amd': true,
        'browser': true,
        'jasmine': true
    },
    globals: {
        'sinon': 1
    }
};
