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
