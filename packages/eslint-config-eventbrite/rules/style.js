// The rules ultimately override any rules defined in legacy/rules/style.js
module.exports = {
    rules: {
        // Enforce function expressions
        // http://eslint.org/docs/rules/func-style
        'func-style': ['error', 'expression'],

        // enforce that `let` & `const` declarations are declared together
        // http://eslint.org/docs/rules/one-var
        'one-var': ['error', 'never'],

        // enforce spacing around infix operators
        // http://eslint.org/docs/rules/space-infix-ops
        'space-infix-ops': 'error'
    }
};
