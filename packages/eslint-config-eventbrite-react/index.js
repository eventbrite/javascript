module.exports = {
    extends: ['eventbrite'].concat([
        './rules/env',
        './rules/react',
        './rules/react-a11y'
    ].map(require.resolve))
};
