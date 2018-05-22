module.exports = {
    extends: ['eventbrite-legacy'].concat([
        './rules/best-practices',
        './rules/errors',
        './rules/es6',
        './rules/esnext',
        './rules/jest',
        './rules/strict',
        './rules/style',
    ].map(require.resolve)),
};
