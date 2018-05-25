## v6.0.0 (May 24, 2018)
- (major) Requires node >= 6
- (major) bump `eslint-config-eventbrite-legacy` to `^4.0.0`
- (major) Bumped `eslint` peer dependency to `^4.19.1`
- (major) Bumped `babel-eslint` peer dependency to `^8.2.3`
- (minor) Bumped `eslint-plugin-import` peer dependency to `^2.11.0`
- (major) Added `eslint-plugin-babel` peer dependency at `^5.1.0`
- (major) Added `eslint-plugin-jest` peer dependency at `^21.15.1`
- (major) Bumped `esling-plugin-react` peer dependency to `^7.7.0`
- (major) New erroring rules:
  * Everything within [plugin:jsx-a11y/recommended](https://github.com/evcohen/eslint-plugin-jsx-a11y/), particularly [jsx-a11y/no-onchange](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md)
  * [react/button-has-type](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md)
  * [react/default-props-match-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md)
  * [react/forbid-foreign-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md)
  * [react/jsx-curly-brace-presence](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md)
  * [react/no-access-state-in-setstate](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md)
  * [react/no-array-index-key](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)
  * [react/no-deprecated](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md)
  * [react/no-find-dom-node](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md)
  * [react/no-redundant-should-component-update](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md)
  * [react/no-this-in-sfc](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md)
  * [react/no-typos](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md)
  * [react/no-unescaped-entities](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md)
  * [react/no-unused-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md)
  * [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)
  * [react/void-dom-elements-no-children](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md)
- (major) Stronger exiting erroring rules:
  * [react/jsx-no-bind](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md) prevents `.bind()` as well as arrow functions & refs in JSX props
  * [react/jsx-tag-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)
- (patch) Relaxed existing erroring rules:
  * [jsx-a11y/anchor-is-valid](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md) to not complain about `<Link to={...}>`
  * [jsx-a11y/label-has-for](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md) to support `<label>` or `<Label>` with text contents
  * [react/jsx-first-prop-new-line](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md) only requires prop on separate line when there are multiple props AND the component spans multiple lines
  * [react/jsx-max-props-per-line](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md) now allows 4 props per line (up from 3)

## v5.0.0 (July 5, 2017)
- (major) Replace old `jsx-a11y` rules

## v4.0.0 (April 28, 2017)
- (major) Add new `jsx-a11y` rules

## v3.0.0 (February 10, 2017)
- (major) bump `eslint-config-eventbrite` to 4.0.0

## v2.0.1 (December 1, 2016)
- (patch) Bump `eslint-config-eventbrite` dependency to 3.0.1
- (dev-ops) Add `eslint-plugin-import` as a peer dependency

## v2.0.0 (November 30, 2016)
- (patch) Bump `eslint-config-eventbrite` dependency to 3.0.0
- (major) Bump to eslint 3
- (patch) Bump to latest versions of `babel-eslint`, `eslint-plugin-react` & `eslint-plugin-jsx-a11y`

## v1.2.0 (July 12, 2016)
- (minor) Change `react/jsx-handler-names` `eventHandlerPrefix` to `_handle` from `handle`
- (patch) Bump `eslint-config-eventbrite` dependency to 2.1.1

## v1.1.2 (June 22, 2016)
- (dev ops) Bump `eslint-config-eventbrite` dependency to 2.1.0

## v1.1.1 (June 22, 2016)
- (dev ops) Bump `eslint-config-eventbrite` dependency to 2.0.0

## v1.1.0 (June 22, 2016)
- (minor) turning off `react/prop-types` (temporarily)
- (minor) validate `htmlFor` on `Label` component as well in `jsx-a11y/label-has-for`

## v1.0.0 (June 7, 2016)
- Initial release
