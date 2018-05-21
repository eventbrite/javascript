module.exports = {
    plugins: ['jsx-a11y'],
    extends: [
        'plugin:jsx-a11y/recommended',
    ],

    // View link below for docs on react a11y rules
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/
    rules: {
        // Enforce an anchor element contains a valid `href` attribute and if it can be replaced by a button
        // (also checks react-router <Link to={...}>)
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': ['error', {components: ['Link'], specialLink: ['to']}],

        // Enforce that `<label>` & (custom) <Label> elements have the `htmlFor` prop
        // either the element is nested within or it has the `htmlFor` prop
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': ['error', {
            components: ['Label'],
            required: {some: ['id', 'nesting']},
            allowChildren: true,
        }],

        // Enforce lang attribute has a valid value.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
        'jsx-a11y/lang': 'error',
    },
};
