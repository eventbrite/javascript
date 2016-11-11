# Eventbrite ES6+ Coding Style Guide

[ESLint](http://eslint.org/) rules and guidelines used by Eventbrite to provide consistency and prevent errors in JavaScript code written in ES6 (and later).

## Table of Contents

0. [ES6 compatibility](#es6-compatibility)
0. [Variables](#variables)
0. [Strings](#strings)
0. [Arrays](#arrays)
0. [Objects](#objects)
0. [Functions](#functions)
0. [Classes](#classes)
0. [Modules](#modules)
0. [Destructuring](#destructuring)

## ES6 compatibility

For browser, server, and compiler ES6 support, check out [kangax](https://twitter.com/kangax)'s [ES6 compatibility table](http://kangax.github.io/compat-table/es6/).

**[⬆ back to top](#table-of-contents)**

## Variables

### `let` vs. `var`

Avoid using `var` for declaring local variables, but instead use `let` which provides [block scoping](https://www.eventbrite.com/engineering/learning-es6-block-level-scoping-with-let-and-const/) (eslint: [`no-var`](http://eslint.org/docs/rules/no-var)):

```js
// good
let x = 'y';

// bad (uses var)
var x = 'y'
```

**[⬆ back to top](#table-of-contents)**

### `const`

Use `const` for the following:

- Actual [constants](#constants), i.e. variables that remain the same through out entire execution
- [Arrow function](#arrow-functions) references

```js
// good
const DEFAULT_NAME = 'Eventbrite';

const generateGreeting = (name=DEFAULT_NAME) => {
    let formattedNow = new Date();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (uses `let` for a constant & arrow function reference)
let DEFAULT_NAME = 'Eventbrite';

let generateGreeting = (name=DEFAULT_NAME) => {
    let formattedNow = (new Date()).toString();

    return `Hi, ${name} on ${formattedNow}`;
}

```

Use `UPPER_SNAKE_CASE` for the naming of constants to help easily identify them:

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

Factor out constants into a separate constants module if a given [module](#modules) has more than 3 constants, importing the constants module as an object:

```js
// good (imports constants as an object from
// constants module)
import * as constants from './constants';

// bad (has more than 3 constants w/in module)
const FIRST_CONSTANT = 'foo';
const SECOND_CONSTANT = 'bar';
const THIRD_CONSTANT = 'baz';
const FOURTH_CONSTANT = 'qux';
const FIFTH_CONSTANT = 'quux';
const SIXTH_CONSTANT = 'corge';
```

However, if you are using 3 or fewer constants from a file, you can use individual named imports instead importing the entire module as an object:

```js
import {FIRST_CONSTANT, FIFTH_CONSTANT} from './constants';
```

Avoid using `const` for local variables (eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const)):

```js
// good
const generateGreeting = (name=DEFAULT_NAME) => {
    let formattedNow = (new Date()).toString();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (uses `const` for `formattedNow` local variable)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = (new Date()).toString();

    return `Hi, ${name} on ${formattedNow}`;
}
```

There is a pattern in the industry to use `const` if a variable is never going to be reassigned within a block (see eslint [`prefer-const`](http://eslint.org/docs/rules/prefer-const)). However, this is an abuse of `const` as it is intended for variables that are truly constant. The motivation for this practice is that it can help enforce "immutability" since a `const` variable cannot be reassigned. But immutability and `const` bindings are two separate things. For instance, an object declared `const` can still have its properties mutated.

For more on constants, read [_Learning ES6: Block-level scoping with `let` and `const`_](http://www.eventbrite.com/engineering/learning-es6-block-level-scoping-with-let-and-const/).

**[⬆ back to top](#table-of-contents)**

## Strings

### Template literals

When building up a string, use a template literal instead of string concatenation (eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html)):

```js
// good
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = (new Date()).toString();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (uses string concatenation)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = (new Date()).toString();

    return 'Hi, ' + name + ' on ' + formattedNow;
}

// bad (uses array join)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = (new Date()).toString();

    return ['Hi, ', name, ' on ', formattedNow].join();
}
```

When using template literals, tokens should **not** be padded by spaces (eslint: [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing)):

```js
// good
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = (new Date()).toString();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (has extra padding around the curlies)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = (new Date()).toString();

    return `Hi, ${ name } on ${ formattedNow }`;
}
```

Use template literals instead of escape single quotes (eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)):

```js
// good
let message = `He's the one!`;

// bad (escapes the single quote)
let message = 'He\'s the one!';

// bad (uses double quotes to avoid quoting)
let message = "He's the one!";
```

Don't use template literals when there is nothing to interpolate (eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-concat)):

```js
// good
const COMPANY_NAME = 'Eventbrite';

// bad (uses template literal unnecessarily)
const COMPANY_NAME = `Eventbrite`;
```

For more on template literals, read [_Learning ES6: Template literals & tagged templates_](http://www.eventbrite.com/engineering/learning-es6-template-literals-tagged-templates/).

**[⬆ back to top](#table-of-contents)**

## Arrays

### Array + spread operator

Use the spread operator (`...`) to create a shallow copy of an array:

```js
// good
let list = [1, 2, 3];
let listCopy = [...list];

// bad (uses `concat` to copy)
let list = [1, 2, 3];
let listCopy = list.concat();

// bad (uses a map to create a copy)
let list = [1, 2, 3];
let listCopy = list.map((item) => item);
```

Use the spread operator (`...`) to join multiple arrays together:

```js
// good
let start = ['do', 're', 'mi'];
let end = ['la', 'ti'];
let scale = [...start, 'fa', 'so', ...end];

// bad
let start = ['do', 're', 'mi'];
let end = ['la', 'ti'];
let scale = start.concat(['fa', 'so']).concat(end);
```

Use the spread operator (`...`) to convert an array-like object into an `Array`:

```js
// good

// NodeList object
let nodeList = document.querySelectorAll('p');

// Array
let nodes = [...nodeList];


// bad (uses a loop convert to an array)

// NodeList object
let nodeList = document.querySelectorAll('p');

// Array
let nodes = [];

for (let i = 0; i < nodeList.length; i++) {
    nodes.push(nodeList[i]);
}
```

For more on the spread operator, read [_Learning ES6: Rest & Spread Operators_](http://www.eventbrite.com/engineering/learning-es6-rest-spread-operators/).

**[⬆ back to top](#table-of-contents)**

## Objects

Coming soon...

**[⬆ back to top](#table-of-contents)**

## Functions

Coming soon...

**[⬆ back to top](#table-of-contents)**

### Arrow Functions

Coming soon...

**[⬆ back to top](#table-of-contents)**

### Rest Parameters

Coming soon...

**[⬆ back to top](#table-of-contents)**

### Default Parameters

Coming soon...

**[⬆ back to top](#table-of-contents)**

## Classes

Coming soon...

**[⬆ back to top](#table-of-contents)**

## Modules

Coming soon...

**[⬆ back to top](#table-of-contents)**
