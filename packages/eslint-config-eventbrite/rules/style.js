// The rules ultimately override any rules defined in legacy/rules/style.js
module.exports = {
    rules: {
        // enforce dangling commas at the end of arrays, objects, imports & exports
        // http://eslint.org/docs/rules/comma-dangle
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'ignore',
        }],

        // Enforce function expressions
        // http://eslint.org/docs/rules/func-style
        'func-style': ['error', 'expression'],

        // enforce that `let` & `const` declarations are declared together
        // http://eslint.org/docs/rules/one-var
        'one-var': ['error', 'never'],

        // enforce spacing around infix operators
        // http://eslint.org/docs/rules/space-infix-ops
        'space-infix-ops': 'error',

        // enforce a space after async
        // const foo = async () => {}
        'space-before-function-paren': ['error', {
            'asyncArrow': 'always',
        }],
    },
};
