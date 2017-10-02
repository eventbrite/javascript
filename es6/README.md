# Eventbrite ES6+ Coding Style Guide

Eventbrite’s [ESLint](http://eslint.org/) guidelines to ensure consistency in JavaScript code written in ES6 and later.

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

Avoid using var for declaring local variables; instead use `let`, which provides  [block scoping](https://www.eventbrite.com/engineering/learning-es6-block-level-scoping-with-let-and-const/) (eslint: [`no-var`](http://eslint.org/docs/rules/no-var)):

```js
// good
let x = 'y';

// bad (uses var)
var x = 'y'
```

**[⬆ back to top](#table-of-contents)**

### `const`

Use `const` for the following:

- Actual [constants](#constants); i.e., variables that remain the same throughout the entire execution
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

Name constants using `UPPER_SNAKE_CASE` for easy identification:

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

If a given [module](#modules) has more than three constants, factor them out into a separate constants module, and then import that constants module as an object:

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

However, if a given module uses three or fewer constants, use individual named imports instead:

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

For more on the spread operator, read [_Learning ES6: Rest & Spread Operators_](http://www.eventbrite.com/engineering/learning-es6-rest-spread-operators/#spread-operator).

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

Use the rest operator (`...`) instead of the `arguments` object to handle an arbitrary number of function parameters (eslint [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)):

```js
// good
const join = (separator, ...values) => (
    values.join(separator);
);

// bad (uses arguments object)
function join(separator) {
	var values = [];

	for (var argNo = 1; argNo < arguments.length; argNo++) {
		values.push(arguments[argNo]);
	}

	return values.join(separator);
};
```

The `arguments` object is problematic for many reasons. It's not an actual `Array` object, so methods like `slice` are unavailable to use. Because we have the `separator` parameter, we have to start at index `1` of `arguments`, which is pretty annoying.  Also, just looking at our `join` function, it's not immediately discoverable that it actually takes more than one parameter, let alone that it supports an infinite number of them. Lastly `arguments` doesn't work with [arrow functions](#arrow-functions).

There should be no spacing between the rest operator and its parameter (eslint: [`rest-spread-spacing`](http://eslint.org/docs/rules/rest-spread-spacing)):

```js

// good
const join = (separator, ...values) => (
    values.join(separator);
);

// bad (space between rest operator and param)
const join = (separator, ... values) => (
    values.join(separator);
);
```

For more on rest parameters, read [_Learning ES6: Rest & Spread Operators_](http://www.eventbrite.com/engineering/learning-es6-rest-spread-operators/#rest-operator).

**[⬆ back to top](#table-of-contents)**

### Default Parameters

Use default parameters in the function header instead of mutating parameters in the function body:

```js
// good
const getData = (options, useCache = true) => {
    let data;

    // get data based on whether we're using the
    // cache or not

    return data;
}

// bad (defaults the parameter in function body)
const getData = (options, useCache) => {
    let data;

    if (useCache === undefined) {
        useCache = true;
    }

    // get data based on whether we're using the
    // cache or not

    return data;
}
```

Put all default parameters at the end of the function header:

```js
// good
const getData = (options, useCache = true) => {
    let data;

    // get data based on whether we're using the
    // cache or not

    return data;
}

// bad (default parameter isn't at the end)
const getData = (useCache = true, options) => {
    let data;

    // get data based on whether we're using the
    // cache or not

    return data;
}
```

For more on default parameters, read [_Learning ES6: Default parameters_](http://www.eventbrite.com/engineering/learning-es6-default-parameters/).

**[⬆ back to top](#table-of-contents)**

### Spread Operator

Use the spread operator (`...`) instead of [`Function.prototype.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) when needing to pass elements of an array as arguments to a function call (eslint: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread)):

```js
// good
let maxValue = Math.max(...[3, 41, 17]);
let today = new Date(...[2016, 11, 16]);

// bad (uses `apply`)
let maxValue = Math.max.apply(null, [3, 41, 17]);
let today = new (Function.prototype.bind.apply(Date, [null, 2016, 11, 16]));
```

Using the spread operator is cleaner because you don't have to specify a context (first example). Furthermore you cannot easily combine `new` with `apply` (second example).

There should be no spacing between the spread operator and its expression (eslint: [`rest-spread-spacing`](http://eslint.org/docs/rules/rest-spread-spacing)):

```js
// good
let maxValue = Math.max(...[3, 41, 17]);

// bad (space between spread operator and
// array literal)
let maxValue = Math.max(... [3, 41, 17]);
```

For more on the spread operator, read [_Learning ES6: Rest & Spread Operators_](http://www.eventbrite.com/engineering/learning-es6-rest-spread-operators/#spread-operator).

**[⬆ back to top](#table-of-contents)**

## Classes

Avoid classes with an empty constructor because classes have a default constructor when one isn't specified (eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)):

```js
// good
class Person {
    speak(phrase) {

    }
}
class Child extends Person {
    speak(phrase) {

    }
}

// bad (has empty/unnecessary constructors)
class Person {
    constructor() {

    }
    speak(phrase) {

    }
}
class Child extends Person {
    constructor() {
        super();
    }
    speak(phrase) {

    }
}
```

Avoid duplicate class members because the interpreter will (silently) use the last one (eslint [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)):

```js
// good
class Person {
    speak(phrase) {

    }
}

// bad (has duplicate methods)
class Person {
    speak(phrase) {

    }
    speak(phrase, lang) {

    }
}
```

Set default values for class properties using declarative syntax instead of defaulting within the `constructor` so that it's clear which properties the class supports instead of being hidden in code:

```js
// good
class TextInput extends React.Component {
    state = {
        value: ''
    }

    render() {
        return (<div />);
    }
}

// bad (defaults `state` within constructor instead
// of using declarative syntax)
class TextInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    render() {
        return (<div />);
    }
}
```

Initialize static class properties using declarative syntax instead of assigning to the class after the class declaration in order to keep everything within the class declaration:

```js
// good
class Button extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired
    }

    render() {
        return (<button />);
    }
}

// bad (assigns static properties on the class declaration)
class Button extends React.Component {
    render() {
        return (<button />);
    }
}
Button.propTypes = {
    type: React.PropTypes.string.isRequired
};
```

Both declarative property syntaxes are not a part of the ES2015 specification and are a in the midst of the ECMAScript proposal approval process. Currently they are sitting in Stage 3. For details, check out [ECMAScript Class Fields and Static Properties](https://github.com/jeffmo/es-class-fields-and-static-properties).

When defining methods to be attached to event listeners, we recommend using the fat arrow syntax within classes to bind the current context without returning a new function each time.

```js

// good: bind the current context using fat arrow syntax
class myComponent extends React.PureComponent {
    _handleResize = () => {
        //handle resize window.
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }
}

// good:
class Button extends React.Component {
    _handleOnClick = () => {
        //handle button click.
    }

    render() {
        return (
            <button onClick={this._handleOnClick}/>
        );
    }
}

// bad: use `Function.bind` in constructor
class Button extends React.Component {
    constructor() {
        this._handleOnClick = this._handleOnClick.bind(this);
    }

    _handleOnClick() {
        //handle button click.
    }

    render() {
        return (
            <button onClick={this._handleOnClick}/>
        );
    }
}

```

For more on classes, read [_Learning ES6: Classes_](http://www.eventbrite.com/engineering/learning-es6-classes/).

**[⬆ back to top](#table-of-contents)**

## Modules

Avoid importing from the same module in separate statements for better maintainability (eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)):

```js
// good
import React, {Component, PropTypes} from 'react';

// bad (imports from same module are in
// separate statements)
import React from 'react';
import {Component, PropTypes} from 'react';
```

Only export constants (eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)):

```js
// good
export const DEFAULT_LENGTH = 10;

// bad (exports a `let` variable)
export let DEFAULT_LENGTH = 10;
```

Place all `import` statements at the beginning of a module (eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)):

```js
// good
import React from 'react';
import classNames from 'classnames';
import {connect} form 'react-redux';

const DEFAULT_LENGTH = 10;


// bad (imports aren't all at the top)
import React from 'react';

const DEFAULT_LENGTH = 10;

import classNames from 'classnames';
import {connect} from 'react-redux';
```

Avoid using webpack loader syntax in module `import` statements in order to decouple code from the module bundler (eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)):

```js
// good
import someCss from 'some.css';
import otherSass from 'other.scss';

// bad (uses webpack loader syntax)
import someCss from 'style!css!some.css';
import otherSass from 'css!sass!other.scss';
```

In order to avoid the webpack loader syntax in `import` statements, configure the loaders in `webpack.config.js`.

For more on modules, read [_ES6 Modules (Final)_](http://www.2ality.com/2014/09/es6-modules-final.html).

**[⬆ back to top](#table-of-contents)**

## Destructuring

The unpacking of values from arrays or properties from objects, into distinct variables.

In general whenever possible, it is strongly encouraged to use destructuring when accessing
values. It allows for easier to maintain code, less if statements, and smaller margin
of error.

### Objects

Always destructure as far as you are able when accessing multiple properties of an object.

*Why do we do this?*:
It prevents the need for creating temporary references to those properties, and creates easier to maintain code.

*Exception*:
If the object represents empty values with something other than undefined (such as `null`), then use
destructuring with caution as defaulting values will not work.

```javascript
// good
let {c137, c186} = ricks;

console.log(`${c137}, ${c186}`);


// bad (adds unnecessary references)
let c137 = ricks.c137;
let c186 = ricks.c186;

console.log(`${c137}, ${c186}`);
```

#### Object Destructuring Examples

Examples showcasing all the different ways we can utilize destructuring
to handle a variety of use cases.

##### Defaulting Properties
```javascript
//good (defaults northernKingdom to empty object if undefined)
let {northernKingdom = {}} = westerosFamilies;

console.log(northernKingdom);

//bad (doesn't take advantage of destructuring)
let northernKingdom = westerosFamilies.northernKingdom;

if (typeof northernKingdom === 'undefined') {
    northernKingdom = {};
}

console.log(northernKingdom);
```

##### Renaming Properties
```javascript
//good (rename multiple properties in one go)
let {
    northernKingdom: familiesInTheNorth,
    southernKingdom: familiesInTheSouth
} = westerosFamilies;

console.log(`${familiesInTheNorth}, ${familiesInTheSouth}`);

//bad (multiple lets, duplication of code)
let familiesInTheNorth = westerosFamilies.northernKingdom;
let familiesInTheSouth = westerosFamilies.southernKingdom;

console.log(`${familiesInTheNorth}, ${familiesInTheSouth}`);
```

##### Accessing Nested Properties
```javascript
//good (allows for easy handling of undefined, renaming)
let {
    northernKingdom: {
        stark: {
            robb
        }
    }
} = westerosFamilies;

console.log(robb);

//bad (difficult to handle objects that may be undefined)
let robb = westerosFamilies.northernKingdom.stark.robb;

console.log(robb);
```

Each of the examples above individually don't stand out too heavily
from their "bad" counterparts; however, where destructuring is incredibly
useful is how it allows you to combine all of these together seamlessly.

##### Combination Example
```javascript
//good
let {
    northernKingdom: {
        stark: {
            robb: kingInTheNorth
        } = {}
    }
} = westerosFamilies;

console.log(kingInTheNorth);

//bad (adds unnecessary code, multiple extra references)
let stark = westerosFamilies.northernKingdom.stark;

if (typeof stark === 'undefined') {
    stark = {};
}

let kingInTheNorth = stark.robb;

console.log(kingInTheNorth);
```
For additional reading on object destructuring, check out our [blog post](https://www.eventbrite.com/engineering/learning-es6-destructuring/#object-destructurin) on the topic!

##### Accessing Functional Parameters
It is also possible to do any of the examples listed above in the function call itself. However, in general it is only recommended to do so when the desstructuring would be relatively simple. If complex functional parameter destructuring is necessary, it may be worthwhile investigating the API of the function itself such that it could consume a simpler object.

```javascript
//good (destructures the incoming object argument in the function call)
const familyParser = ({northernKingdom, southernKingdom}) => {
    return `${northernKingdom}, ${southernKingdom}`;
}

//bad (adds unnecessary references)
const familyParser = (westerosFamilies) => {
    let northernKingdom = westerosFamilies.northernKingdom;
    let southernKingdom = westerosFamilies.southernKingdom;

    return `${northernKingdom}, ${southernKingdom}`;
}
```
For additional reading on destructuring functional parameters specifically, check out our [blog post](https://www.eventbrite.com/engineering/learning-es6-destructuring/#destructured-parameters) on the topic!

### Arrays

It is also possible to use destructuring to access values within arrays.

```javascript
let characters = ['Mr PoopyButthole', 'Bird Person', 'Ants in My Eyes Johnson', 'Shrimply Pibbles'];

// good
let [mrPoopy, birdPerson] = characters;

// bad (adds unnecessary code)
let mrPoopy = characters[0];
let birdPerson = characters[1];

//good
let [mrPoopy, _, antsInMyEyes] = characters;

//bad
let mrPoopy = characters[0];
let antsInMyEyes = characters[2];
```
For additional reading on destructuring arrays, check out our [blog post](https://www.eventbrite.com/engineering/learning-es6-destructuring/#array-destructuring) on the topic!

**[⬆ back to top](#table-of-contents)**
