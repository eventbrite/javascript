# eslint-config-eventbrite

[![version](https://img.shields.io/npm/v/eslint-config-eventbrite.svg?style=flat-square)](http://npm.im/eslint-config-eventbrite)
[![downloads](https://img.shields.io/npm/dt/eslint-config-eventbrite.svg?style=flat-square)](http://npm-stat.com/charts.html?package=eslint-config-eventbrite&from=2016-05-27)
[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/eventbrite/javascript/pulse)
[![license](https://img.shields.io/npm/l/eslint-config-eventbrite.svg?style=flat-square)](http://spdx.org/licenses/MIT)

Eventbrite's base ESLint config that lints ES6+/ES2015+ and adheres to the [Eventbrite JavaScript Coding Style Guide](https://github.com/eventbrite/javascript).

## Usage

This ESLint configuration requires [`eslint`](https://github.com/eslint/eslint).

Install `eslint` & `eslint-config-eventbrite` dependencies:

```sh
npm install --save-dev eslint eslint-config-eventbrite
```

Extend `eslint-config-eventbrite` in your [`.eslintrc.json`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files):

```json
{
    "extends": [
        "eventbrite"
    ]
}
```

_NOTE:_ This configuration extends [`eslint-config-eventbrite-legacy`](../eslint-config-eventbrite-legacy).

## Contributing

Thank you for your willingness to contribute! 😀

Although `eslint-config-eventbrite` is a public package, its primary purpose is for linting Eventbrite's JavaScript code. Therefore, it is unlikely that we'll accept changes to rules as they may adversely affect the linting of our own code. However, we do welcome fixes for errors or additions for omissions.

If you are uncertain as to whether your suggestion qualifies, go ahead and submit a [Pull Request](https://github.com/eventbrite/javascript/pulls) and we'll let you know. Thanks again!

## License

[MIT](https://github.com/evenbrite/javascript/LICENSE). Copyright (c) 2016 Eventbrite.

## Thanks

Many thanks to Airbnb and their example [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).
