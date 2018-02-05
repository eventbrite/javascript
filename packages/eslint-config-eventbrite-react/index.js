module.exports = {
    extends: ['eventbrite'].concat([
        './rules/react',
        './rules/react-a11y'
    ].map(require.resolve))
};
