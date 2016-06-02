module.exports = {
    env: {
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
        }
    },
    rules: {
        // require parentheses around arrow function parameters
        // http://eslint.org/docs/rules/arrow-parens
        'arrow-parens': 'error',

        // require spacing before & after arrow function's arrow
        // http://eslint.org/docs/rules/arrow-spacing
        'arrow-spacing': 'error',

        // disallow arrow functions where they could be confused with comparisons
        // unless a parentheses are used to disambiguate
        // http://eslint.org/docs/rules/no-confusing-arrow
        'no-confusing-arrow': ['error', {allowParens: false}],

        // disallow duplicate module imports & exports
        // http://eslint.org/docs/rules/no-duplicate-imports
        'no-duplicate-imports': ['error', {includeExports: true}],

        // disallow unnecessary computed property keys in object literals
        // http://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-computed-key': 'error',

        // disallow unnecessary (empty) constructors
        // http://eslint.org/docs/rules/no-useless-constructor
        'no-useless-constructor': 'error',

        // disallow renaming import, export, and destructured assignments to the same name
        // http://eslint.org/docs/rules/no-useless-rename
        'no-useless-rename': 'error',

        // require use of let & const
        // http://eslint.org/docs/rules/no-var
        'no-var': 'error',

        // require method & property shorthand for object literals
        // http://eslint.org/docs/rules/object-shorthand
        'object-shorthand': 'error',

        // arrow functions should be used as callbacks
        // http://eslint.org/docs/rules/prefer-arrow-callback
        'prefer-arrow-callback': 'error',

        // do not use const everywhere
        // http://eslint.org/docs/rules/prefer-const
        'prefer-const': 'off',

        // use the rest operator instead of arguments
        // http://eslint.org/docs/rules/prefer-rest-params
        'prefer-rest-params': 'error',

        // use the spread operator instead of apply
        // http://eslint.org/docs/rules/prefer-spread
        'prefer-spread': 'error',

        // use template literals instead of string concatentation
        // http://eslint.org/docs/rules/prefer-template
        'prefer-template': 'error',

        // require generator functions to contain `yield`
        // http://eslint.org/docs/rules/require-yield
        'require-yield': 'error',

        // do not enforce any sorting of imports
        // http://eslint.org/docs/rules/sort-imports
        'sort-imports': 'off',

        // require or disallow spacing around embedded expressions of template strings
        // http://eslint.org/docs/rules/template-curly-spacing
        'template-curly-spacing': 'error',

        // disallow spacing in between `yield` & `*` and enforce a space after `*`
        // http://eslint.org/docs/rules/yield-star-spacing
        'yield-star-spacing': 'error'
    }
};
