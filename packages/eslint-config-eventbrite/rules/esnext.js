module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
        },
    },

    rules: {
        // disallow await inside of loops
        // https://eslint.org/docs/rules/no-await-in-loop
        'no-await-in-loop': 'error',

        // disallows unnecessary return await
        // https://eslint.org/docs/rules/no-return-await
        'no-return-await': 'error',
    },
};
