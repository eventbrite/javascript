module.exports = {
    plugins: ['jsx-a11y'],
    extends: [
        'plugin:jsx-a11y/strict',
    ],

    // View link below for docs on react a11y rules
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/
    rules: {
        // Enforce an anchor element contains a valid `href` attribute and if it can be replaced by a button
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': ['error', {components: ['Link']}],

        // Enforce that `<label>` & (custom) <Label> elements have the `htmlFor` prop
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': ['error', {components: ['Label']}],

        // Enforce lang attribute has a valid value.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
        'jsx-a11y/lang': 'error',

        // Don't enforce that `onBlur` is used instead of (or more likely in parallel with) `onChange`
        // NOTE: We may want to consider this later, but this has UX implications
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md
        'jsx-a11y/no-onchange': 'off',
    },
};
