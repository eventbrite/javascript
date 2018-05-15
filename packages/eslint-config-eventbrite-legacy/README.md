# eslint-config-eventbrite-legacy

[![version](https://img.shields.io/npm/v/eslint-config-eventbrite-legacy.svg?style=flat-square)](http://npm.im/eslint-config-eventbrite-legacy)
[![downloads](https://img.shields.io/npm/dt/eslint-config-eventbrite-legacy.svg?style=flat-square)](http://npm-stat.com/charts.html?package=eslint-config-eventbrite-legacy&from=2016-05-27)
[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/eventbrite/javascript/pulse)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![license](https://img.shields.io/npm/l/eslint-config-eventbrite-legacy.svg?style=flat-square)](http://spdx.org/licenses/MIT)

Eventbrite's legacy ESLint config that lints ES5- and adheres to the [Eventbrite JavaScript Coding Style Guide](https://github.com/eventbrite/javascript).

## Usage

This ESLint configuration requires [`eslint`](https://github.com/eslint/eslint).

Install using [npm](https://www.npmjs.com/get-npm):

```sh
npm install --save-dev eslint@^4.19.1 eslint-config-eventbrite-legacy
```

...or using [yarn](https://yarnpkg.com/):

```sh
yarn add --dev eslint@^4.19.1 eslint-config-eventbrite-legacy
```

Extend `eslint-config-eventbrite-legacy` in your [`.eslintrc.json`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files):

```json
{
    "extends": "eventbrite-legacy"
}
```

_NOTE:_ This configuration extends `eslint:recommended`.

## Contributing

Thank you for your willingness to contribute! 😀

Although `eslint-config-eventbrite-legacy` is a public package, its primary purpose is for linting Eventbrite's legacy JavaScript code written in ES5. Therefore, it is unlikely that we'll accept changes to rules as they may adversely affect the linting of our own code. However, we do welcome fixes for errors or additions for omissions.

If you are uncertain as to whether your suggestion qualifies, go ahead and submit a [Pull Request](https://github.com/eventbrite/javascript/pulls) and we'll let you know. Thanks again!

## License

The library is available as open source under the terms of the [MIT License](https://github.com/evenbrite/javascript/LICENSE).

## Thanks

Many thanks to Airbnb and their example [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).
