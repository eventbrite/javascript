# Eventbrite ES6+ Coding Style Guide

[ESLint](http://eslint.org/) rules and guidelines used by Eventbrite to provide consistency and prevent errors in JavaScript code written in ES6 (and later).

## Table of Contents

0. [ES6 compatibility](#es6-compatibility)
0. [Variables](#variables)
0. [Constants](#constants)

## ES6 compatibility

For browser, server, and compiler ES6 support, check out [kangax](https://twitter.com/kangax)'s [ES6 compatibility table](http://kangax.github.io/compat-table/es6/).

**[⬆ back to top](#table-of-contents)**

## Variables

### `let` vs. `var`

Coming soon...

**[⬆ back to top](#table-of-contents)**

### `const`

Coming soon...

**[⬆ back to top](#table-of-contents)**

## Constants

### Naming

Use UPPER_SNAKE_CASE for the naming of constants to help easily identify them:

```js
// good
const MAX_ALLOWED = 7;

// bad (uses snake_case)
const max_allowed = 7;

// bad (uses PascalCase)
const MaxAllowed = 7;

// bad (uses normal camelCase)
const maxAllowed = 7;
```

**[⬆ back to top](#table-of-contents)**

### Importing

Coming soon...

**[⬆ back to top](#table-of-contents)**
