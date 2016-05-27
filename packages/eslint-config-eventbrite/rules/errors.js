// The rules ultimately override any rules defined in legacy/rules/errors.js
module.exports = {
    rules: {
        // allows (but does not require) trailing commas when the
        // last element or property is in a different line than the
        // closing ] or } and disallows trailing commas when the last
        // element or property is on the same line as the closing ] or }
        // http://eslint.org/docs/rules/comma-dangle
        'comma-dangle': 'error'
    }
};
