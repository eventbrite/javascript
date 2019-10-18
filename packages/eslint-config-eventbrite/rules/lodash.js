module.exports = {
    rules: {
        // Enforce atomic imports of lodash methods to improve bundle size
        // https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/import-scope.md
        'import-scope': 'method',
    },
};
