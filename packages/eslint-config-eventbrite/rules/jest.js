module.exports = {
    env: {
        jest: true,
        'jest/globals': true,
    },
    plugins: ['jest'],
    extends: ['plugin:jest/recommended'],
    rules: {
        // Enforces top level test to use `test` and all tests nested within `describe` to use `it`
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/consistent-test-it.md
        'jest/consistent-test-it': 'error',

        // Enforce lowercase test names
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/lowercase-name.md
        'jest/lowercase-name': 'error',

        // Enforce using `toBeNull()`
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-be-null.md
        'jest/prefer-to-be-null': 'error',

        // Enforce using `toBeUndefined()`
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-be-undefined.md
        'jest/prefer-to-be-undefined': 'error',

        // Enforce valid `describe()` callback
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-describe.md
        'jest/valid-describe': 'error',

        // Enforce having return statement when testing with promises
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-expect-in-promise.md
        'jest/valid-expect-in-promise': 'error',
    },
};
