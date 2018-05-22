// The rules ultimately override any rules defined in legacy/rules/best-practices.js
module.exports = {
    rules: {
        // disallow modifying properties of parameters
        // http://eslint.org/docs/rules/no-param-reassign
        'no-param-reassign': ['error', {props: true}],

        // allow `this` keywords outside of classes or class-like objects
        // so that `babel/no-invalid-this` can disallow (see es6 rules)
        // http://eslint.org/docs/rules/no-invalid-this
        'no-invalid-this': 'off',
    },
};
