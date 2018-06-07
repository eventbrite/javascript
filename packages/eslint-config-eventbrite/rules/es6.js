module.exports = {
    env: {
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
        },
    },
    plugins: ['import'],
    extends: ['plugin:import/errors'],
    rules: {
        // require parentheses around arrow function parameters
        // http://eslint.org/docs/rules/arrow-parens
        'arrow-parens': 'error',

        // require spacing before & after arrow function's arrow
        // http://eslint.org/docs/rules/arrow-spacing
        'arrow-spacing': 'error',

        // enforce a default export is present, given a default import
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
        'import/default': 'error',

        // disallow any invalid exports, i.e. re-export of the same name
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
        'import/export': 'error',

        // enforce all imports appear before other statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
        'import/first': 'error',

        // enforce a newline after import statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
        'import/newline-after-import': 'error',

        // enforce named imports correspond to a named export in the remote file
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
        'import/named': 'error',

        // enforce imported namespaces contain dereferenced properties as they are dereferenced
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
        'import/namespace': 'error',

        // disallow import of modules using absolute paths
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
        'import/no-absolute-path': 'error',

        // disallow AMD `require` and `define` calls
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
        'import/no-amd': 'error',

        // disallow CommonJS require calls and `module.exports` or `exports.*`
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
        'import/no-commonjs': 'error',

        // disallow a module from importing a module with a dependency path back to itself
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md
        'import/no-cycle': 'error',

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

        // prevent use of exported name as identifier of default export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
        'import/no-named-as-default': 'error',

        // prevent use of exported name as property of default export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
        'import/no-named-as-default-member': 'error',

        // prevent named default exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
        'import/no-named-default': 'error',

        // enforce imports point to a file/module that can be resolved
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
        'import/no-unresolved': 'error',

        // disallow a module from importing itself
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md
        'import/no-self-import': 'error',

        // prevent unnecessary path segments in import and require statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md
        'import/no-useless-path-segments': 'error',

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

        // require const declarations for variables that are never reassigned after declared
        // http://eslint.org/docs/rules/prefer-const
        'prefer-const': 'error',

        // use the rest operator instead of arguments
        // http://eslint.org/docs/rules/prefer-rest-params
        'prefer-rest-params': 'error',

        // use the spread operator instead of apply
        // http://eslint.org/docs/rules/prefer-spread
        'prefer-spread': 'error',

        // use template literals instead of string concatentation
        // http://eslint.org/docs/rules/prefer-template
        'prefer-template': 'error',

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
        'yield-star-spacing': 'error',
    },
};
