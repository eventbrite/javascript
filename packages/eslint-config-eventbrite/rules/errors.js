// The rules ultimately override any rules defined in legacy/rules/errors.js
module.exports = {
    rules: {
        // http://eslint.org/docs/rules/comma-dangle
        'comma-dangle': ['error', {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "ignore"
        }]
    }
};
