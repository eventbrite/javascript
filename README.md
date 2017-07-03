# Eventbrite JavaScript Coding Style Guide

Eventbrite's [ESLint](http://eslint.org/) guidelines to ensure consistency in JavaScript code.

## Intended Audience

This coding style guide has been created _for_ Eventbrite developers, but is certainly applicable for the general JavaScript community as well. It is heavily inspired by [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).

## Table of Contents

0. [ESLint Configurations](#eslint-configurations)
0. [General guidelines](general/)
0. [ES6+](es6/)
0. [React & JSX](react/)
0. [Testing React](react/testing.md)
0. [Legacy ES5](es5/)
0. [Backbone & Marionette](backbone/)
0. [Resources](#resources)
0. [License](#license)

## ESLint Configurations

Eventbrite has 3 ESLint configuration packages that you can extend:

- [`eslint-config-eventbrite`](packages/eslint-config-eventbrite): base ESLint config that lints ES6+/ES2015+
- [`eslint-config-eventbrite-react`](packages/eslint-config-eventbrite-react): extends `eslint-config-eventbrite`, also linting React & JSX
- [`eslint-config-eventbrite-legacy`](packages/eslint-config-eventbrite-legacy): ESLint config that lints legacy ES5-

## Resources

Coming soon...

## License

[MIT](LICENSE). Copyright (c) 2017 Eventbrite.
