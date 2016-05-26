// The rules ultimately override any rules defined in legacy/rules/best-practices.js
module.exports = {
    rules: {
        // Require constructor function names to begin with a capital letter
        // Requires all `new` operators to be called with uppercase-started functions.
        // Requires all uppercase-started functions to be called with new
        // http://eslint.org/docs/rules/new-cap
        'new-cap': 'error',

        // disallow modifying properties of parameters
        // http://eslint.org/docs/rules/no-param-reassign
        'no-param-reassign': ['error', {props: true}]
    }
};
