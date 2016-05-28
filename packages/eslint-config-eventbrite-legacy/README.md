# eslint-config-eventbrite-legacy

[![version](https://img.shields.io/npm/v/eslint-config-eventbrite-legacy.svg?style=flat-square)](http://npm.im/eslint-config-eventbrite-legacy)
[![downloads](https://img.shields.io/npm/dt/eslint-config-eventbrite-legacy.svg?style=flat-square)](http://npm-stat.com/charts.html?package=eslint-config-eventbrite-legacy&from=2016-05-27)
[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/eventbrite/javascript/pulse)
[![license](https://img.shields.io/npm/l/eslint-config-eventbrite-legacy.svg?style=flat-square)](http://spdx.org/licenses/MIT)

Eventbrite's legacy ESLint config that lints ES5- and adheres to the [Eventbrite JavaScript Coding Style Guide](https://github.com/eventbrite/javascript).

## Usage

This ESLint configuration requires [`eslint`](https://github.com/eslint/eslint).

Install `eslint` & `eslint-config-eventbrite-legacy` dependencies:

```sh
npm install --save-dev eslint eslint-config-eventbrite-legacy
```

Extend `eslint-config-eventbrite-legacy` in your [`.eslintrc.json`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files):

```json
{
    "extends": [
        "eventbrite-legacy"
    ]
}
```

_NOTE:_ This configuration extends `eslint:recommended`.

## License

[MIT](https://github.com/evenbrite/javascript/LICENSE). Copyright (c) 2016 Eventbrite.

## Thanks

Many thanks to Airbnb and their example [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).
