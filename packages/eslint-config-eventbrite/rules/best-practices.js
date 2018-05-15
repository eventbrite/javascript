// The rules ultimately override any rules defined in legacy/rules/best-practices.js
module.exports = {
    rules: {
        // disallow modifying properties of parameters
        // http://eslint.org/docs/rules/no-param-reassign
        'no-param-reassign': ['error', {props: true}],
    },
};
