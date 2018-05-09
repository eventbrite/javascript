module.exports = {
    rules: {
        // disallow catch clause parameters from shadowing variables in the outer scope
        // https://eslint.org/docs/rules/no-catch-shadow
        'no-catch-shadow': 'error',

        // disallow variable declarations from shadowing variables declared in the outer scope
        // https://eslint.org/docs/rules/no-shadow
        'no-shadow': ['error', {builtinGlobals: true}],

        // disallow identifiers from shadowing restricted names
        // https://eslint.org/docs/rules/no-shadow-restricted-names
        'no-shadow-restricted-names': 'error',

        // disallow the use of variables before they are defined
        // https://eslint.org/docs/rules/no-use-before-define
        'no-use-before-define': 'error'
    }
};
