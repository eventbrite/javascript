module.exports = {
    extends: ['eslint:recommended'].concat([
        './rules/best-practices',
        './rules/errors',
        './rules/node',
        './rules/style',
        './rules/variables'
    ].map(require.resolve))
};
