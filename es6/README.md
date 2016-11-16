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
    let formattedNow = new Date();

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
    let formattedNow = new Date();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (uses `const` for `formattedNow` local variable)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = new Date();

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
    const formattedNow = new Date();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (uses string concatenation)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = new Date();

    return 'Hi, ' + name + ' on ' + formattedNow;
}

// bad (uses array join)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = new Date();

    return ['Hi, ', name, ' on ', formattedNow].join();
}
```

When using template literals, tokens should **not** be padded by spaces (eslint: [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing)):

```js
// good
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = new Date();

    return `Hi, ${name} on ${formattedNow}`;
}

// bad (has extra padding around the curlies)
const generateGreeting = (name=DEFAULT_NAME) => {
    const formattedNow = new Date();

    return `Hi, ${ name } on ${ formattedNow }`;
}
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

When a variable name matches the name of the object key in an object literal, use [property value shorthand](http://www.eventbrite.com/engineering/learning-es6-enhanced-object-literals/#property-value-shorthand) (eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand)):

```js
let name = 'Eventbrite';

// good
let data = {
    name
};

// bad (duplicates key and variable name)
let data = {
    name: name
};
```

Group any object literal property value shorthands at the beginning of the object literal so that it's easier to see which properties are using the shorthand:

```js
let name = 'Eventbrite';
let location = 'San Francisco, CA';

// good
let data = {
    name,
    location,
    ceo: 'Julia Hartz',
    founders: ['Julia Hartz', 'Kevin Hartz', 'Renaud Visage']
};

// bad (shorthands aren't at the top)
let data = {
    name,
    ceo: 'Julia Hartz',
    founders: ['Julia Hartz', 'Kevin Hartz', 'Renaud Visage'],
    location
};
```

When creating object literals with dynamic property names, use [computed property keys](http://www.eventbrite.com/engineering/learning-es6-enhanced-object-literals/#computed-property-keys) (eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand)):

```js
let name = 'Eventbrite';
let location = 'San Francisco, CA';
let leaderName = 'ceo';

// good
let data = {
    name,
    location,
    [leaderName]: 'Julia Hartz',
    founders: ['Julia Hartz', 'Kevin Hartz', 'Renaud Visage']
};

// bad (doesn't leverage computed property keys)
let data = {
    name,
    location,
    founders: ['Julia Hartz', 'Kevin Hartz', 'Renaud Visage']
};

data[leaderName] = 'Julia Hartz';
```

When defining methods on an object literal, use [method definition shorthand](http://www.eventbrite.com/engineering/learning-es6-enhanced-object-literals/#method-definition-shorthand) (eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand)):

```js
let name = 'Eventbrite';
let location = 'San Francisco, CA';
let leaderName = 'ceo';

// good
let data = {
    name,
    location,
    [leaderName]: 'Julia Hartz',
    founders: ['Julia Hartz', 'Kevin Hartz', 'Renaud Visage'],
    getDisplay() {
        return `${this.name} in ${this.location}`;
    }
};

// bad (doesn't leverage method definition shorthand)
let data = {
    name,
    location,
    [leaderName]: 'Julia Hartz',
    founders: ['Julia Hartz', 'Kevin Hartz', 'Renaud Visage'],
    getDisplay: function() {
        return `${this.name} in ${this.location}`;
    }
};
```

Use the [object spread operator](https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spread.md) instead of [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to create a shallow copy with source object properties merged in:

```js
// good
let warriors = {Steph: 95, Klay: 82, Draymond: 79};
let newWarriors = {
    ...warriors,
    Kevin: 97
};

// bad (uses Object.assign instead)
let warriors = {Steph: 95, Klay: 82, Draymond: 79};
let newWarriors = Object.assign({}, warriors, {
    Kevin: 97
});

// terrible (mutates `warriors` variable)
let warriors = {Steph: 95, Klay: 82, Draymond: 79};
let newWarriors = Object.assign(warriors, {
    Kevin: 97
});
```

The object spread operator (as well as `Object.assign`) only make shallow copies. As such they only work on a single level of nesting at a time. However, you need to merge into a level deeper than the top level, you can still make use of the object spread operator:

```js
let teams = {
    warriors: {Steph: 95, Klay: 82, Draymond: 79},
    cavs: {Lebron: 98, Kyrie: 87, Kevin: 80}
};
let updatedTeams = {
    ...teams,
    warriors: {
        ...updatedTeams.warriors,
        Kevin: 97
    }
};
```

For more on enhanced object literals, read [_Learning ES6: Enhanced object literals_](http://www.eventbrite.com/engineering/learning-es6-enhanced-object-literals/).

**[⬆ back to top](#table-of-contents)**

## Functions

### Arrow Functions

When an arrow function expression is needed, use an arrow function in place of an anonymous function (eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback)):

```js
// good
[1, 2, 3].map((x) => x * x);

// bad (uses anonymous function)
[1, 2, 3].map(function(x) {
    return x * x;
})
```

Include a single space around the arrow (`=>`) in an arrow function (eslint: [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing)):

```js
// good
[1, 2, 3].map((x) => x * x);

// bad (missing spaces around arrow)
[1, 2, 3].map((x)=>x * x);
```

Always surround the parameters of an arrow function with parentheses (eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens)):

```js
// good
[1, 2, 3].map((x) => x * x);

// bad (missing parentheses surrounding parameters)
[1, 2, 3].map(x => x * x);
```

When the function body is a single expression, omit the curly braces and use the implicit return syntax (eslint: [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style)):

```js
// good (uses implicit return for single expression)
[1, 2, 3].map((x) => x * x);

// bad (doesn't use implicit return for single expression)
[1, 2, 3].map((x) => {
    return x * x;
});
```

When the function body is a single expression, but spans multiple lines, surround the function body in parentheses:

```js
// good
eventIds.forEach((eventId) => (
    fetch(`EVENT_SAVE_URL/${eventId}`, {
        method: 'POST'
    })
));

// bad (missing parentheses surrounding function body)
eventIds.forEach((eventId) => fetch(`EVENT_SAVE_URL/${eventId}`, {
    method: 'POST'
}));
```

For more on arrow functions, read [_Learning ES6: Arrow Functions_](http://www.eventbrite.com/engineering/learning-es6-arrow-functions/).

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
