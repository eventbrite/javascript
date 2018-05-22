module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
        },
    },
    plugins: ['babel'],

    rules: {
        // disallow await inside of loops
        // https://eslint.org/docs/rules/no-await-in-loop
        'no-await-in-loop': 'error',

        // allow `this` keywords outside of classes or class-like objects
        // so that `babel/no-invalid-this` can disallow (see below)
        // http://eslint.org/docs/rules/no-invalid-this
        'no-invalid-this': 'off',

        // disallow `this` keywords outside of classes or class-like objects
        // (but allow inside class properties)
        // https://github.com/babel/eslint-plugin-babel/
        'babel/no-invalid-this': 'error',

        // disallows unnecessary return await
        // https://eslint.org/docs/rules/no-return-await
        'no-return-await': 'error',
    },
};
