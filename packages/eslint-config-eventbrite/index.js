module.exports = {
    extends: ['eventbrite-legacy'].concat([
        './rules/best-practices',
        './rules/es6',
        './rules/style'
    ].map(require.resolve))
};
