module.exports = {
    plugins: [
        'react'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'plugin:react/recommended'
    ],

    // View link below for react rules documentation
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    rules: {
        // Use double quotes for JSX
        // http://eslint.org/docs/rules/jsx-quotes
        'jsx-quotes': 'error',

        // Forbid propTypes: any, array, object
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
        'react/forbid-prop-types': 'error',

        // True boolean props must pass {true} value
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        'react/jsx-boolean-value': ['error', 'always'],

        // Enforce closing bracket location in JSX is aligned with opening tag
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-bracket-location': 'error',

        // Disallow spaces within curly brackets
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        'react/jsx-curly-spacing': 'error',

        // Disallow spaces around equal sgns in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-equals-spacing': 'error',

        // Enforce that the first property should always be placed on a new line when the properties are spread over multiple lines
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-first-prop-new-line': ['error', 'multiline'],

        // Enforce event handler naming conventions in JSX: on* for props, handle* from functions
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': 'error',

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
        'react/jsx-max-props-per-line': ['error', {maximum: 3}],

        // Prevent arrow functions & refs in a JSX prop (but still allow bind for now)
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        'react/jsx-no-bind': ['error', {
            allowBind: true
        }],

        // Prevent usage of unsafe target="_blank" w/o rel="noopener noreferrer"
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        'react/jsx-no-target-blank': 'error',

        // Enforce PascalCase for user-defined JSX components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': 'error',

        // Enforce that there's a space before the closing bracket of self-closing JSX elements
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md
        'react/jsx-space-before-closing': 'error',

        // Warn when using "dangerous" JSX properties
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': 'warn',

        // Prevent multiple component definitions in a given file
        // (stateless helper components are ok)
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
        'react/no-multi-comp': ['error', {ignoreStateless: true}],

        // Prevent using (legacy) string references in ref attribute
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': 'error',

        // Require ES6 class declarations over React.createClass
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': 'error',

        // Do not enforce stateless React Components to be written as a pure function
        // TODO: Consider enabling in the future because they will benefit from
        // future performance optimizations
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': 'off',

        // (temporary) Allow missing props validation in a React component definition
        // TODO: Reenable once we're able to configure it to ignore stateless functions (our helper components)
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': 'off',

        // Enforce that ES6 class returns a value for `render()` method
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
        'react/require-render-return': 'error',

        // Enforce that components are self-closed when they don't have content
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        'react/self-closing-comp': 'error',

        // Enforce default component methods order
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': 'error',

        // Enforce multi-line JSX is wrapped in parentheses
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md
        'react/wrap-multilines': 'error'
    }
};
