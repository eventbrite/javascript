## v5.0.0 (May 24, 2018)
- (major) Requires node >= 6
- (major) bump `eslint-config-eventbrite-legacy` to `^4.0.0`
- (major) Bumped `eslint` peer dependency to `^4.19.1`
- (major) Bumped `babel-eslint` peer dependency to `^8.2.3`
- (minor) Bumped `eslint-plugin-import` peer dependency to `^2.11.0`
- (major) New erroring rules:
  * [import/default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md)
  * [import/named](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md)
  * [import/namespace](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md)
  * [import/no-amd](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md)
  * [import/no-commonjs](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md)
  * [import/no-cycle](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md)
  * [import/no-named-as-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md)
  * [import/no-named-as-default-member](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md)
  * [import/no-named-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md)
  * [import/no-self-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md)
  * [import/no-useless-path-segments](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md)
  * [no-await-in-loop](https://eslint.org/docs/rules/no-await-in-loop)
  * [no-return-await](https://eslint.org/docs/rules/no-return-await)
  * [strict](https://eslint.org/docs/rules/strict)
- (major) Stronger exiting erroring rules:
  * [comma-dangle](http://eslint.org/docs/rules/comma-dangle) is turned on for `import` & `export`
  * [prefer-const](http://eslint.org/docs/rules/prefer-const) is turned on enforce using `const` whenever possible
- (major) Added `eslint-plugin-babel` peer dependency at `^5.1.0`
  * [babel/no-invalid-this](https://github.com/babel/eslint-plugin-babel/) replaces [no-invalid-this](http://eslint.org/docs/rules/no-invalid-this)
- (major) Added `eslint-plugin-jest` peer dependency at `^21.15.1`
  * Everything within [plugin:jest/recommended](https://github.com/jest-community/eslint-plugin-jest#rules)
  * [jest/consistent-test-it](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/consistent-test-it.md)
  * [jest/lowercase-name](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/lowercase-name.md)
  * [jest/prefer-to-be-null](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-be-null.md)
  * [jest/prefer-to-be-undefined](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-be-undefined.md)
  * [jest/valid-describe](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-describe.md)
  * [jest/valid-expect-in-promise](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-expect-in-promise.md)

## v4.0.0 (February 10, 2017)
- (major) bump `eslint-config-eventbrite-legacy` to 3.0.0

## v3.0.1 (December 1, 2016)
- (patch) Bug fix: Need `babel-eslint@7` peer dependency

## v3.0.0 (November 30, 2016)
- (patch) bump `eslint-config-eventbrite-legacy` to 2.0.0
- (major) added `arrow-body-style`, `space-infix-ops`, `rest-spread-spacing`, and `import/*` rules
- (major) bump to eslint 3

## v2.1.1 (July 12, 2016)
- (patch) bump `eslint-config-eventbrite-legacy` to 1.1.1

## v2.1.0 (June 29, 2016)
- (minor) turn off `no-confusing-arrow`

## v2.0.0 (June 22, 2016)
- (dev ops) added `babel-eslint` dependency so ES2016+ can be linted
- (minor) relaxed `comma-dangle` to allow dangling commas for multi-line
- (breaking change) only function expressions (arrow functions) allowed in ES6+
- (minor) ignore imports for `no-useless-rename`
- (minor) relax `no-confusing-arrow` by setting `allowParens` to `true`
- (dev ops) Bump `eslint-config-eventbrite-legacy` to 1.1.0

## v1.0.0 (June 7, 2016)
- Initial release
