# Eventbrite JavaScript Coding Style Guide

Eventbrite’s guidelines to ensure consistency in JavaScript code in any environment.

## Table of Contents

0. [Conditionals](#conditionals)
0. [Assignments](#assignments)
0. [Functions](#functions)
0. [Iterators](#iterators)
0. [Naming Conventions](#naming-conventions)
0. [Commas](#commas)

## Conditionals

### Complex conditional expressions

Avoid complex conditional expressions within conditional statements. Simplification is necessary because you must fully understand an expression to process the overall code flow. Simplification also comes into play during the subsequent tasks of conducting code reviews or revisiting old code: you must understand what state the conditional expression represents to evaluate the logic in the code.

To make things easier, store complex conditional expressions in state variables:

```js
// good
var shouldContinue = !options || (options.continue && options.hasWon);

if (shouldContinue) {

}

// bad
if (!options || (options.continue && options.hasWon)) {

}
```

**[⬆ back to top](#table-of-contents)**

### Negative conditional expressions

Positive conditional expressions are generally easier to follow than negative ones. Try to flip the logic so that the positive case is considered first:

```js
// good
if (something && somethingElse) {
    /* do stuff*/
} else {
    /* do other stuff */
}

// bad (negative case comes first)

if (!something || !somethingElse ) {
    /* do stuff */
} else {
    /* do other stuff */
}
```

If satisfying a negative condition should exit or throw, put the negative condition first. This generally improves readability especially for functions with more than one logical branching or large blocks.

```js
// good
const cond = () => {
    if (!something) {
        return;
    }

    /* do other stuff */
}

// bad 
const cond = () => {
    if (something) {
        /* do stuff */
        /* do more stuff */
        /* do even more stuff */
        /* keep doing stuff */
        /* never stop doing stuff... */
    } else {
        return;
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Multiple `if-else`

Creating a chain of conditional statements can make refactoring hard because the decisions are mixed with the actions. Instead, separate out the decisions into functions that can return simple actions:

```js
// good

// decision
var whatToDoWithTheThing = this.getSomethingAction();

// execution
this[whatToDoWithTheThing]();


// bad (mixed decisions and actions)
if (this.something()) {
   /* do stuff */
} else if (this.otherSomething()) {
   /* do other stuff */
} else if (this.somethingEvenMoreCurious()) {
   /* yet another thing */
} else {
   /* default something */
}
```

For more details, check out [_Replacing the `switch` statement for object literals_](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/).

#### Case study

**_First iteration_**: Multiple return statements and if-else statements that mix decision with execution.
```js
var getType = function(model) {
    if (model % 2 !== 0) {
        return 'odd';
    } else if (model % 2 !== 0) {
        return 'even';
    } else if (model === 'Eventbrite') {
        return 'Eventbrite';
    }
    return 'default';
};
```

**_Second iteration_**: Use a lookup map to avoid multiple return statements inside a single function and to abstract conditional logic. This enables maintainability and readability, and boosts performance by using `.find`.

```js
// good (use a lookup map)
var helpers = {
    isOdd: function(value) {
        return value % 2 !== 0;
    },
    isEven: function(value) {
        return value % 2 === 0;
    },
    isEventbrite: function(value) {
    	return value === 'Eventbrite';
    }
}

var types = {
    isOdd: 'odd',
    isEven: 'even',
    isEventbrite: 'eventbrite'
};

_getType = function(types, model) {
    var type = _.find(types, function(value, key) {
        // will return the first value of the key that evaluates to true;
        return helpers[key](model);
    });
    return type || 'default';
}
```

NOTE: We are using Underscore's .find method here, but with ES6, we can use find natively.
For more info, visit [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

**[⬆ back to top](#table-of-contents)**

### Ternary statements

Simple ternary expressions are handy when conditionally assigning a value to a variable, when the condition is both `true` and `false`. However, for assigning the variable when the condition is `true`, avoid the temptation to use that ternary, returning `undefined`, `null`, `''` for the `false` case. Instead, declare the value without assigning it (the default value is `undefined`), and then use an `if` statement to assign to it when the condition is met:

```js
// good
var value;

if (options.isSomethingTrue) {
    value = 'hey there';
}

return value;

// bad (uses a ternary that returns undefined or null)
var options.isSomethingTrue ? 'hey there' : undefined;

```

This pattern uses the basic structures of the language in a more formal way, because the use of ternaries presumes that a value is required. Our suggested approach enables traceability when debugging and more robust maintenance over time. It also correlates with a defined state and lends itself to future alteration if required, instead of having a default state that is dynamic.

#### Case study

Let's look at a case study of how code can evolve over time. For this example we have created a fictional piece of code.

**_First iteration_**: nothing fancy, just a method that needs to gather some information:

```js
var isAllowed = hasParent && isOwner,
    parentEvent = isAllowed ? getParentEvent() : undefined;

/* some use of these 2 variables later on... */
```

**_Second iteration_**: a different developer comes around to add yet another condition following the current style, because a refactor is out of scope:

```js
var isAllowed = hasParent && isOwner,
    parentEvent = isAllowed ? getParentEvent() : undefined,
    options = isAllowed ? undefined : getOptions();

/* some use of these 3 variables later on... */
```

**_Third iteration_**: another team comes in needing more functionality and adds even more variables:

``` js
var isAllowed = hasParent && isOwner,
    parentEvent = isAllowed ? getParentEvent() : undefined,
    options = isAllowed ? undefined : getOptions(),
    childEventsTitles = isAllowed ? getEventChildTitles() : undefined,
    ownerAccount = isAllowed ? undefined : getOwnerAccount();

/* some use of these 5 variables later on... */
```

At this point, with all the possible states based on ternaries, determining the base state for this method is now much harder. Furthermore, having used the same `isAllowed` four times, we must now understand how all the state variables work before we can optimize the code. The code is too fragile.

However, had this code adhered to our initial recommendation, it would not have degraded with added functionality.

**_First iteration (revisited)_**:

```js
var isAllowed = hasParent && isOwner,
    parentEvent;

if (isAllowed) {
	parentEvent = getParentEvent();
}

/* some use of these 2 variables later on... */
```

**_Second iteration (revisited)_**:

```js
var isAllowed = hasParent && isOwner,
    parentEvent,
    options;

if (isAllowed) {
	parentEvent = getParentEvent();
} else {
	options = getOptions();
}

/* some use of these 3 variables later on... */
```

 **_Third iteration (revisited)_**:

```js
var isAllowed = hasParent && isOwner,
    parentEvent,
    options,
    childEventsTitles,
    ownerAccount;

if (isAllowed) {
    parentEvent = getParentEvent();
    childEventsTitles = getEventChildTitles();
} else {
    options = getOptions();
    ownerAccount = getOwnerAccount();
}

/* some use of these 5 variables later on... */
```

**[⬆ back to top](#table-of-contents)**

## Functions

### Immediately-invoked function expressions

Avoid using IIFEs (immediately-invoked function expressions) if possible. The `bind` function is preferred when dealing with variable scope in closures (note that `bind` is only available in ES5+,
though we use `es5-shim` so `bind` should always be in our codebase by default).

```js
var purchaseTicketButtonSelector = '.goog-te-combo';

// good (using .bind)
buyTicketFunction = function(options) {
    buyTickets(_.pick(options, 'eventId', 'ticketId'));
};

$(purchaseTicketButtonSelector).click(buyTicketFunction.bind(null, options));

// bad (using IIFEs)
buyTicketFunction = (function(options) {
    return function() {
        buyTickets(_.pick(options, 'eventId', 'ticketId'));
    };
})(options);

$(purchaseTicketButtonSelector).click(function() {
    buyTicketFunction();
});
```

IIFEs tend to add unnecessary complexity (note that the "bad" IIFE example
has three nested functions, while the "good" example has one) and is harder to
change or extend.

**[⬆ back to top](#table-of-contents)**

## Assignments

### Variable indirection

Avoid generic names; instead, assign names that explain the content. If data must be changed as part of a process, create methods to produce these changes on demand whenever possible.

```js
// good
_handleEvent = function(e) {
    _doSomethingWithEvent(e.target.checked);
}

// bad
_handleEvent = function(e) {
    var checked = e.target.checked;

    _doSomethingWithEvent(checked);
}
```

**[⬆ back to top](#table-of-contents)**

## Iterators

We particularly try to avoid iterations that don't have predictable output e.g. `forEach`, `for` and `while` loops.
Any need for an external element to store or transform the result of an output, is frowned upon.

This enforces our [immutability](https://www.sitepoint.com/immutability-javascript/) rule and limits the temptation of putting logic inside a loop.
It is easier to deal with pure functions that return values than dealing with there side effects.

Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

```js

/// Objects

const peoplesFavoriteFruits = {
    'vivian': 'mango',
    'alby': 'banana',
    'gago': 'tomato'
};

// good (use a functional approach) ES6
const fruits = Object.keys(peoplesFavoriteFruits).map(key => peoplesFavoriteFruits[key]);

// good (use a functional approach) ES5
var fruits = Object.keys(peoplesFavoriteFruits).map(function(key) {
    return peoplesFavoriteFruits[key];
});

// bad
var fruits = [];
Object.keys(peoplesFavoriteFruits).forEach(function (index) {
  return fruits.push(peoplesFavoriteFruits[index]);
});

// very bad
var fruits = [];
for (var key in peoplesFavoriteFruits) {
   fruits.push(peoplesFavoriteFruits[key]);
}

/// Arrays

const numbers = [1, 2, 3, 4, 5];

// good (use a functional approach) ES6
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// good (use a functional approach) ES5
var sum = numbers.reduce(function (total, num) {
  return total + num;
}, 0);
sum === 15;

// bad
var sum = 0;
numbers.forEach(function (num) {
  return sum += num;
});
sum === 15;

// very bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good (keeping it functional) ES6
const increasedByOne = numbers.map(num => num + 1);

// good (keeping it functional) ES5
var increasedByOne = numbers.map(function (num) {
  return num + 1;
});

// bad
var increasedByOne = [];
numbers.forEach(function (num) {
  return increasedByOne.push(num + 1);
});

// very bad
var increasedByOne = [];
for (var i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}
```

**[⬆ back to top](#table-of-contents)**

## Naming Conventions
> There are only two hard things in Computer Science: cache invalidation and naming things. *Phil Karlton*

### Variables: Classes or newable functions
Classes or newable functions (meant to be factories) should be PascalCase:

```js
var groupTicket = new Ticket(id: 555);
```
### Variables: Helpers and common variables

Any variable that's not a class or newable function, should be camelCase. This includes local variables, helper functions, modules, etc.

```js
//good
var pagination = require('pagination'),
    pages = pagination.getPages();

//bad
var Pagination = require('pagination'),
    pages = Pagination.getPages();
```

### Variables: Boolean

Variables that will contain a boolean value should start with either `is` or `has`:

```js
//good
var isAvailable = true,
    hasTickets = false;

//bad
var available = true,
    IHaveTickets = false;
```
### Variables: jQuery elements

Variables that contain jQuery elements should start with a dollar sign ($) so that we can quickly identify these types of variables by scanning the code (i.e. static analysis). This makes code review easier.

```js
var $elements = $('someSelector'), // in case a global search
    $element = this.$('some selector'); // in case of backbone
```
### Variables: Deferred

If a variable contains a jQuery.Deferred() or Promise, the variable should end in Dfd or Promise, respectively:

```js
//good
var fetchPromise = fetch('http://some/url'),
     requestDfd = new $.Deferred() // in case of jquery promises.

//bad
var request = fetch('http://some/url'),
    onResolve = new $.Deferred();
```

### Constants

Constants should be all written in capital letters and in snake_case. (except config object.)

```js
//good
const DEFAULT_VALUE = 'none';

var TIMEOUT = 3;

var config = {};

//bad
const defaultValue = 'none';

var timeout = 3;

var someOtherStaticVariable = 'blah';
```

### Variables: objects, strings, integers

Avoid names that are generic and instead, try to make your best effort to find a proper name in order to explain the content of it. If data needs to be changed, as part of a process, try to create methods to produce this changes on demand.

```js

//good
var attendeeNames = {},
    translatedGreeting = 'hola!',
    getDefaultPrice = parseInt(5, 10);

//bad
var propsObject = {},
    trimmedString = 'hello   '.trim(),
    intPrice = parseInt(5, 10);

```

### Method: Private

Prefix private method names with an underscore (`_`):

```js

// good
var _getInternalValue = function() {
    // code here.
};

// bad (does not begin with underscore)
var getInternalValuePleaseDonot = function() {
    // code here.
};
```

The underscore prefix naming convention for private methods emphasizes the methods that are not part of the component's public API. This makes it easy for future developers to identify the methods they can refactor or even remove without affecting any users of the component. Upgrading to new technologies/tools/idioms is now simpler.

The naming convention also helps code reviewers distinguish the methods we have added from those belonging to the framework's lifecycle (see: [React](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods) or [Marionette](https://marionette.gitbooks.io/marionette-guides/content/en/views/triggers.html)).

### Method: Public

Should always begin with [camelCase](http://c2.com/cgi/wiki?LowerCamelCase).

```js

// good
getNode: function() {
    //code here.
},
setAttr: function() {
    // code here.
};

// bad (not camelCase)
_superComplextName: function() {
    // code here.
}

UpdateAll: function() {
    // code here
}
```

**[⬆ back to top](#table-of-contents)**

## Commas

(ES6) Trailing Commas are only enforced for multi-line objects and arrays. (see: [comma-dangle](http://eslint.org/docs/rules/comma-dangle#always-multiline))

```js

// good
const brunch = [
    eggs,
    chicken,
    spinach,
    hashbrowns,
];

// bad
const brunch = [
    eggs,
    chicken,
    spinach,
    hashbrowns
];

// good
const eventbrite = {
    age: 11,
    marketplace: 'global',
    color: 'sunrise-orange-500',
    hq: 'San Francisco',
};

// bad
const eventbrite = {
    age: 11,
    marketplace: 'global',
    color: 'sunrise-orange-500',
    hq: 'San Francisco'
};
```
**[⬆ back to top](#table-of-contents)**
