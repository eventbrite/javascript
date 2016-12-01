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
    plugins: [
        'import'
    ],
    extends: [
        'plugin:import/errors'
    ],
    rules: {
        // require no braces where they can be omitted
        // http://eslint.org/docs/rules/arrow-body-style
        'arrow-body-style': 'error',

        // require parentheses around arrow function parameters
        // http://eslint.org/docs/rules/arrow-parens
        'arrow-parens': 'error',

        // require spacing before & after arrow function's arrow
        // http://eslint.org/docs/rules/arrow-spacing
        'arrow-spacing': 'error',

        // disallow any invalid exports, i.e. re-export of the same name
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
        'import/export': 'error',

        // ensure all imports appear before other statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
        'import/first': 'error',

        // enforce a newline after import statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
        'import/newline-after-import': 'error',

        // disallow import of modules using absolute paths
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
        'import/no-absolute-path': 'error',

        // disallow require() calls with expressions
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
        'import/no-dynamic-require': 'error',

        // disallow repeated import of the same module in multiple places
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
        'import/no-duplicates': 'error',

        // disallow the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': 'error',

        // disallow the use of mutable exports with var or let
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
        'import/no-mutable-exports': 'error',

        // ensure imports point to a file/module that can be resolved
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
        'import/no-unresolved': 'error',

        // disallow Webpack loader syntax in imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
        'import/no-webpack-loader-syntax': 'error',

        // disallow potentially ambiguous parse goal (script vs. module)
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
        'import/unambiguous': 'error',

        // allow arrow functions where they could be confused with comparisons
        // http://eslint.org/docs/rules/no-confusing-arrow
        'no-confusing-arrow': 'off',

        // disallow unnecessary computed property keys in object literals
        // http://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-computed-key': 'error',

        // disallow unnecessary (empty) constructors
        // http://eslint.org/docs/rules/no-useless-constructor
        'no-useless-constructor': 'error',

        // disallow renaming export and destructured assignments to the same name
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

        // prevents spacing between rest/spread operator (...)
        // and the expression
        // http://eslint.org/docs/rules/rest-spread-spacing
        'rest-spread-spacing': 'error',

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
