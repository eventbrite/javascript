module.exports = {
    plugins: [
        'react',
    ],
    env: {
        browser: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:react/recommended',
    ],

    // View link below for react rules documentation
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    rules: {
        // Use double quotes for JSX
        // http://eslint.org/docs/rules/jsx-quotes
        'jsx-quotes': 'error',

        // Forbid `<button>` element without an explicit `type` attribute
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
        'react/button-has-type': 'error',

        // Prevent extraneous `defaultProps` on components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': 'error',

        // Forbid propTypes: `any`, `array`, `object`
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
        'react/forbid-prop-types': 'error',

        // Forbid using another component's `propTypes` unless they are explicitly imported/exported
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        'react/forbid-foreign-prop-types': 'error',

        // True boolean props must pass {true} value
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        'react/jsx-boolean-value': ['error', 'always'],

        // Enforce closing bracket location in JSX is aligned with opening tag
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-bracket-location': 'error',

        // Enforce the closing tag for multiline elements with children are aligned with the opening tag on its own line
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
        'react/jsx-closing-tag-location': 'error',

        // Disallow spaces within curly brackets
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        'react/jsx-curly-spacing': 'error',

        // Disallow unnecessary curly braces in JSX props and/or children
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
        'react/jsx-curly-brace-presence': 'error',

        // Disallow spaces around equal sgns in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-equals-spacing': 'error',

        // Enforce that the first property should always be placed on a new line if the JSX tag takes
        // up multiple lines and there are multiple properties
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

        // Enforce event handler naming conventions in JSX: on* for props, _handle* from methods/functions
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': ['error', {
            eventHandlerPrefix: '_handle',
            eventHandlerPropPrefix: 'on',
        }],

        // Enforce 4 space JSX tag indentation
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': 'error',

        // Enforce 4 space JSX props indentation
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': 'error',

        // Validate JSX has key prop when in array or iterator
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
        'react/jsx-key': 'error',

        // Limit maximum of props on a single line in JSX to 3
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
        'react/jsx-max-props-per-line': ['error', {maximum: 4}],

        // Prevent `.bind`, arrow functions & refs in a JSX prop
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        'react/jsx-no-bind': 'error',

        // Prevent usage of unsafe target="_blank" w/o rel="noopener noreferrer"
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        'react/jsx-no-target-blank': 'error',

        // Enforce PascalCase for user-defined JSX components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': 'error',

        // Forbid spaces after the opening bracket
        // Forbid spaces before the closing bracket
        // Enforce spaces before the closing bracket of self-closing elements
        // Forbid spaces between the angle bracket and slash of JSX closing or self-closing elements
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
        'react/jsx-tag-spacing': ['error', {
            afterOpening: 'never',
            beforeClosing: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never',
        }],

        // Enforce multi-line JSX is wrapped in parentheses
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': 'error',

        // Prevent usage of `this.state` inside `setState` calls
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
        'react/no-access-state-in-setstate': 'error',

        // Warn if an element uses an Array index in its `key`
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-array-index-key': 'warn',

        // Warn when using "dangerous" JSX properties
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': 'warn',

        // Prevent usage of deprecated methods
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-deprecated': 'error',

        // Prevent usage of `findDOMNode` because Facebook will eventually deprecate it as it
        // blocks certain improvements in React in the future
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-find-dom-node': 'error',

        // Prevent usage of `shouldComponentUpdate` when extending `React.PureComponent`
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
        'react/no-redundant-should-component-update': 'error',

        // Prevent using (legacy) string references in ref attribute
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': 'error',

        // Prevent `this` from being used in stateless functional components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
        'react/no-this-in-sfc': 'error',

        // Prevents common typos made declaring static class properties and lifecycle methods
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
        'react/no-typos': 'error',

        // Prevent some characters from appearing in markup w/o being escaped
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unescaped-entities': ['error', {forbid: ['>', '}', '"']}],

        // Prevent definitions of unused state
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md
        'react/no-unused-state': 'error',

        // Require ES6 class declarations over React.createClass
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': 'error',

        // Do not enforce stateless React Components to be written as a pure function
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': 'off',

        // Prevent missing props validation in a React component definition
        // Skips components where **no** prop types are defined (i.e. our helper components)
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': ['error', {skipUndeclared: true}],

        // Enforce that ES6 class returns a value for `render()` method
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
        'react/require-render-return': 'error',

        // Enforce that components are self-closed when they don't have content
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        'react/self-closing-comp': 'error',

        // Enforce default component methods order
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': 'error',

        // Prevent void DOM elements (e.g. `<img />`, `<br />`) from receiving children
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
        'react/void-dom-elements-no-children': 'error',
    },
};
