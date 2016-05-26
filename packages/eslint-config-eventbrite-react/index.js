module.exports = {
    extends: ['eventbrite'].concat([
        './rules/react'
    ].map(require.resolve))
};
