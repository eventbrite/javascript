module.exports = {
    rules: {
        // enforce one-true-brace style
        // http://eslint.org/docs/rules/brace-style
        'brace-style': 'error',

        // require camel case names
        // http://eslint.org/docs/rules/camelcase
        'camelcase': 'error',

        // enforce spacing only after comma
        // http://eslint.org/docs/rules/comma-spacing
        'comma-spacing': 'error',

        // enforces The standard comma style, in which commas are
        // placed at the end of the current line
        // http://eslint.org/docs/rules/comma-style
        'comma-style': 'error',

        // If a variable is initialized or assigned the value `this`,
        // the name of the variable must be a 'self'.
        // http://eslint.org/docs/rules/consistent-this
        'consistent-this': ['error', 'self'],

        // Enforce function declarations-only (except allow arrow
        // function expressions)
        // http://eslint.org/docs/rules/func-style
        'func-style': ['error', 'declaration', {
            allowArrowFunctions: true
        }],

        // 4-space indentation
        // http://eslint.org/docs/rules/indent
        'indent': ['error', 2, {
            SwitchCase: 1
        }],

        // space for values in object literals
        // http://eslint.org/docs/rules/key-spacing
        'key-spacing': 'error',

        // disallow the omission of parentheses when invoking a constructor with no arguments
        // http://eslint.org/docs/rules/new-parens
        'new-parens': 'error',

        // require an empty newline after variable declarations
        // http://eslint.org/docs/rules/newline-after-var
        'newline-after-var': 'error',

        // Disallow inline comments after code
        // http://eslint.org/docs/rules/no-inline-comments
        'no-inline-comments': 'error',

        // Prevent more than 2 empty lines within a file,
        // 1 at the end, and 0 at the beginning
        // http://eslint.org/docs/rules/no-multiple-empty-lines
        'no-multiple-empty-lines': ['error', {
            max: 2,
            maxEOF: 1,
            maxBOF: 0
        }],

        // disallows the use of nested ternary expressions
        // http://eslint.org/docs/rules/no-nested-ternary
        'no-nested-ternary': 'error',

        // allow underscores in identifiers
        // http://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': 'off',

        // disallow whitespace before properties
        // http://eslint.org/docs/rules/no-whitespace-before-property
        'no-whitespace-before-property': 'error',

        // disallow padding within curly braces of object literals
        // http://eslint.org/docs/rules/object-curly-spacing
        'object-curly-spacing': 'error',

        // enforce that `var` declarations are declared together
        // http://eslint.org/docs/rules/one-var
        'one-var': ['error', {
            'var': 'always'
        }],

        // require a newline around variable declarations
        // http://eslint.org/docs/rules/one-var-declaration-per-line
        'one-var-declaration-per-line': 'error',

        // require operator assignment shorthand where possible
        // http://eslint.org/docs/rules/operator-assignment
        'operator-assignment': 'error',

        // don't enforce placement of operators with line breaks
        // http://eslint.org/docs/rules/operator-linebreak
        'operator-linebreak': 'off',

        // always use single quotes
        // http://eslint.org/docs/rules/quotes
        'quotes': ['error', 'single'],

        // require use of semicolons
        // http://eslint.org/docs/rules/semi
        'semi': 'error',

        // require a space before blocks
        // http://eslint.org/docs/rules/space-before-blocks
        'space-before-blocks': 'error',

        // never have a space before function parentheses
        // http://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': ['error', 'never']
    }
};
