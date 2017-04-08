module.exports = {
    plugins: ['jsx-a11y'],

    // View link below for docs on react a11y rules
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/
    rules: {

        // Enforce all anchors to contain accessible content.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md
        'jsx-a11y/anchor-has-content': 'error',

        // Enforce a clickable non-interactive element has at least one keyboard event listener.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
        'jsx-a11y/click-events-have-key-events': 'error',

        // Enforce heading (h1, h2, etc) elements contain accessible content.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md
        'jsx-a11y/heading-has-content': 'error',

         // Enforce lang attribute has a valid value.
         // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
        'jsx-a11y/lang': 'error',

         // Enforce distracting elements are not used.
         // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md
        'jsx-a11y/no-distracting-elements': 'error',

         // Enforce explicit role property is not the same as implicit/default role property on element.
         // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
        'jsx-a11y/no-redundant-roles': 'error',

         // Enforce non-interactive elements have no interactive handlers.
         // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
        'jsx-a11y/no-static-element-interactions': 'error',

         // Enforce scope prop is only used on <th> elements.
         // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md
        'jsx-a11y/scope': 'error',

        // Enforce all `aria-*` props are valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
        'jsx-a11y/aria-props': 'error',

        // Enforce ARIA state and property values are valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
        'jsx-a11y/aria-proptypes': 'error',

        // Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
        'jsx-a11y/aria-role': 'error',

        // Enforce that elements that do not support ARIA roles, states,
        // and properties do not have those attributes
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md
        'jsx-a11y/aria-unsupported-elements': 'error',

        // Enforce an anchor element's `href` prop value is not just `#`
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/href-no-hash.md
        'jsx-a11y/href-no-hash': 'error',

        // Enforce that `<img>` JSX elements use the `alt` prop
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-has-alt.md
        'jsx-a11y/img-has-alt': 'error',

        // Enforce `<img>` alt prop does not contain the word "image", "picture", or "photo"
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md
        'jsx-a11y/img-redundant-alt': 'error',

        // Enforce that `<label>` & (custom) <Label> elements have the `htmlFor` prop
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': ['error', {components: ['Label']}],

        // Enforce that onMouseOver/onMouseOut are accompanied by onFocus/onBlur
        // for keyboard-only users
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        'jsx-a11y/mouse-events-have-key-events': 'error',

        // Enforce that the `accessKey` prop is not used on any element to avoid
        // complications with keyboard commands used by a screenreader.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md
        'jsx-a11y/no-access-key': 'error',

        // Don't enforce that `onBlur` is used instead of (or more likely in parallel with) `onChange`
        // NOTE: We may want to consider this later, but this has UX implications
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md
        'jsx-a11y/no-onchange': 'off',

        // Enforce that elements with `onClick` handlers must be focusable
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/onclick-has-focus.md
        'jsx-a11y/onclick-has-focus': 'error',

        // Enforce that non-interactive, visible elements (such as `<div>`)
        // that have click handlers use the role attribute
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/onclick-has-role.md
        'jsx-a11y/onclick-has-role': 'error',

        // Enforce that elements with ARIA roles must have all required attributes for that role
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md
        'jsx-a11y/role-has-required-aria-props': 'error',

        // Enforce that elements with explicit or implicit roles defined contain
        // only `aria-*` properties supported by that `role`
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
        'jsx-a11y/role-supports-aria-props': 'error',

        // Enforce `tabIndex` value is not greater than zero
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md
        'jsx-a11y/tabindex-no-positive': 'error'
    }
};
