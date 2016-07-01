# Eventbrite React & JSX Coding Style Guide

[ESLint](http://eslint.org/) rules, guidelines and best practices used by Eventbrite to provide consistency and prevent errors in React and JSX code.

## Table of Contents

0. [What is React?](#what-is-react)
0. [What is JSX?](#what-is-jsx)
0. [General rules](#general-rules)
0. [Component files](#component-files)
0. [Component class](#component-class)
0. [Component organization](#component-organization)
0. [Component reference naming](#component-reference-naming)
0. [Component `propTypes`](#component-proptypes)
0. [Helper components](#helper-components)
0. [Component method ordering](#component-method-ordering)
0. [JSX wrapping](#jsx-wrapping)
0. [JSX alignment](#jsx-alignment)
0. [JSX attribute values](#jsx-attribute-values)
0. [State](#state)

## What is React?

[React](https://facebook.github.io/react/) is a JavaScript-centric UI library. It abstracts away the DOM, giving a simpler programming model and better performance. It can also render on the server using Node, and can even power native apps using [React Native](https://facebook.github.io/react-native/). React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.

For more info, see [Getting started with React](https://facebook.github.io/react/docs/getting-started.html).

**[⬆ back to top](#table-of-contents)**

## What is JSX?

[JSX](https://facebook.github.io/jsx/) is a JavaScript syntax extension that looks similar to XML. We use it with React because it is a concise and familiar syntax for defining tree structures with attributes.

For more info, see [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html).

**[⬆ back to top](#table-of-contents)**

## General rules

Always use JSX syntax (don't use `React.createElement`):

```js
// good
render() {
    return (
        <Component value="foo">
            <ChildComponent />
        </Component>
    );
}

// bad (why torture yourself with React.createElement?)
render() {
    return React.createElement(
        Component,
        { value: "foo" },
        React.createElement(ChildComponent, null)
    );
}
```

**[⬆ back to top](#table-of-contents)**

## Component files

- Use PascalCase for React component names, e.g. `TextInput`
- Use `.js` extension for React components
- Use the component name for filenames. E.g., `TextInput.js`

**[⬆ back to top](#table-of-contents)**

## Component class

### Class style

Prefer ES6 classes over `React.createClass` (eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)):

```js
// good
export default class MainComponent extends React.Component {

}

// bad (uses React.createClass)
const MainComponent = React.createClass({

});
export default MainComponent
```

_NOTE:_ There is a common practice to use stateless/pure functions over ES6 classes for components without any internal state (eslint: [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)), but we are choosing to stick with ES6 classes for a few reasons:

- When the component does more than just render `props`, such as attaching callback handlers, the stateless function can become unnecessarily complex with nested functions
- [`propTypes`](#component-propTypes) are defined _within_ the ES6 class, but have to be defined as additional properties _outside_ of a stateless function
- Using ES6 classes for the main/default component help differentiate it from [helper components](#helper-components)

**[⬆ back to top](#table-of-contents)**

#### `displayName`

Do not use `displayName` for naming components. Instead, name the `class` expression. React will infer the `displayName` from the reference name:

```jsx
// good
export default class TextInput extends React.Component {
}

// ok (uses class expression assigned to a named const reference)
const TextInput = class extends React.Component {
};

// bad (missing name of `class` expression)
export default class extends React.Component {
}

// bad (uses `displayName` instead of `class` name)
export default class extends React.Component {
    static displayName = 'TextInput';
}
```

## Component organization

Export only one component per file as the default (eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md))

```js
// MainComponent.js

// good
export default class MainComponent extends React.Component {

}


// bad (exports multiple components)
export class MainComponent extends React.Component {

}
export class OtherComponent extends React.Component {

}
```

**[⬆ back to top](#table-of-contents)**

## Component reference naming

Use PascalCase for React components and camelCase for their instances (eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)).

Components:
```js
// good
import TextInput from './atoms/TextInput';

// bad (uses camelCase for component reference)
import textInput from './atoms/TextInput';
```

Component instances:
```js
// good
let emailField = (<TextInput name="email" />);

// bad (uses PascalCase for component instances)
let EmailField = (<TextInput name="email" />);
```

**[⬆ back to top](#table-of-contents)**

## Component `propTypes`

### Definition

Use `static` class property syntax to define `propTypes` and `defaultProps`:

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        type: React.PropTypes.string,
        defaultValue: React.PropTypes.string
    }

    static defaultProps = {
        type: 'text',
        defaultValue: ''
    }
}

// bad (adds `propTypes` & `defaultProps` after class definition)
const TextInput = class extends React.Component {
    static propTypes = {
        type: React.PropTypes.string,
        defaultValue: React.PropTypes.string
    }
};

TextInput.propTypes = {
    type: React.PropTypes.string,
    defaultValue: React.PropTypes.string
};
TextInput.defaultProps = {
    type: 'text',
    defaultValue: ''
};

export default TextInput;
```

_NOTE:_ [Static class properties](https://github.com/jeffmo/es-class-fields-and-static-properties) are not a part of the ES2015 specification and are a in the midst of the ECMAScript proposal approval process. Currently they are sitting in Stage 1. For all proposed features, check out [ECMAScript proposals](https://github.com/tc39/ecma262#current-proposals).

**[⬆ back to top](#table-of-contents)**

### Naming

Use camelCase for `propTypes` (eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase)):

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        type: React.PropTypes.string,
        defaultValue: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    }
}

// bad (uses non-camelCase)
export default class TextInput extends React.Component {
    static propTypes = {
        type: React.PropTypes.string,
        default_value: React.PropTypes.string,
        OnChange: React.PropTypes.func,
        On_Focus: React.PropTypes.func,
        on_Blur: React.PropTypes.func
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Required props

Don't mark any of the `propTypes` as required if they are included in `defaultProps` or are boolean values that (implicitly) default to `false`:

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        type: React.PropTypes.string,
        required: React.PropTypes.bool,
        defaultValue: React.PropTypes.string,
        role: React.PropTypes.string
    }

    static defaultProps = {
        type: 'text',
        defaultValue: '',
    }
}

// bad (`type` is marked as required even though it's defaulted &
// `required` is marked as required even though it's boolean w/ `false` default)
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        type: React.PropTypes.string.isRequired,
        required: React.PropTypes.bool.isRequired,
        defaultValue: React.PropTypes.string,
        role: React.PropTypes.string
    }

    static defaultProps = {
        type: 'text',
        defaultValue: '',
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Ordering

Define required `propTypes` first to make it clear what the set of minimum props are needed to use the component:

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        role: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,

        type: React.PropTypes.string,
        required: React.PropTypes.bool,
        defaultValue: React.PropTypes.string
    }

    static defaultProps = {
        type: 'text',
        defaultValue: '',
    }
}

// bad (required props are not first)
export default class TextInput extends React.Component {
    static propTypes = {
        type: React.PropTypes.string,
        required: React.PropTypes.bool,
        defaultValue: React.PropTypes.string,
        role: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    }

    static defaultProps = {
        type: 'text',
        defaultValue: '',
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Vague types

Don't use the vague prop types, `React.PropTypes.any`, `React.PropTypes.array`, and `React.PropTypes.object`, and instead be more explicit using, `React.PropTypes.oneOfType`, `React.PropTypes.arrayOf`, and `React.PropTypes.shape` (eslint [`react/forbid-prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md)):

```js
// good
export default class Candidate extends React.Component {
    static propTypes = {
        id: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        names: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        person: React.PropTypes.shape({
            name: React.PropTypes.string,
            age: React.PropTypes.number
        })
    }
}

// bad (uses vague prop types)
export default class Candidate extends React.Component {
    static propTypes = {
        id: React.PropTypes.any,
        names: React.PropTypes.array,
        person: React.PropTypes.object
    }
}
```

**[⬆ back to top](#table-of-contents)**

## Helper components

Coming soon...

**[⬆ back to top](#table-of-contents)**

## Component method ordering

Coming soon...

**[⬆ back to top](#table-of-contents)**

## JSX Wrapping

Always wrap JSX tags in parentheses as a signal that we're transitioning from vanilla JavaScript to JSX (eslint: [`react/wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md)):

```js
// good (multi-line JSX wrapped in parentheses)
render() {
    return (
        <Component value="foo">
            <ChildComponent />
        </Component>
    );
}

// good (single-line JSX is also wrapped in parentheses)
let content = (<div>Content</div>);

// bad (missing wrapping parentheses for multi-line)
render() {
    return <Component value="foo">
        <ChildComponent />
    </Component>;
}

// bad (missing wrapping parentheses for single-line)
let content = <div>Content</div>
```

**[⬆ back to top](#table-of-contents)**

## JSX alignment

### Single-line

When a component has three props or less with no content, the tag can be on a single line (eslint: [`react/jsx-max-props-per-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md)):

```js
// good
<TextInput type="email" name="email" />

// not-so-good (attributes are on the long side)
<TextInput type="email" name="really-long-email-name" placeholder="Enter in your email here please" />

// bad (more than 3 attributes)
<TextInput type="email" name="email" id="email" tabIndex="0"  />
```

**[⬆ back to top](#table-of-contents)**

### Multi-line

However, if the props are too long or there are more than three props, the JSX attributes should each be on their own line (eslint: [`react/jsx-first-prop-new-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md)):


```js
// good
<TextInput
    type="email"
    name="email"
    placeholder="Enter in your email"
/>

// bad (first attribute is on the same line)
<TextInput type="email"
    name="email"
    placeholder="Enter in your email"
/>

// bad (two attributes on the same line when others are multi-line)
<TextInput
    type="email" name="email"
    placeholder="Enter in your email"
/>
```

**[⬆ back to top](#table-of-contents)**

### Indentation

JSX attributes must be indented four spaces (eslint: [`react/jsx-indent`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md)):


```js
// good
<TextInput
    type="email"
    name="email"
    id="email"
    placeholder="Enter in your email"
/>

// bad (attributes aren't indented 4 spaces)
<TextInput
type="email"
name="email"
id="email"
placeholder="Enter in your email"
/>
```

**[⬆ back to top](#table-of-contents)**

### Closing bracket

The closing bracket should be aligned with the opening tag (eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)):

```js
// good
<TextInput
    type="email"
    name="email"
    id="email"
    placeholder="Enter in your email"
/>
<Button type="submit">
    Go!
</Button>

// bad (self-closing isn't aligned with opening tag)
<TextInput
    type="email"
    name="email"
    id="email"
    placeholder="Enter in your email" />

// bad (closing tag isn't aligned with opening tag)
<Button type="submit">
    Go!</Button>
```

**[⬆ back to top](#table-of-contents)**

### Self-closing

If the component has no content, the JSX tag should be self-closing (eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)) with a space before the self-closing tag (eslint: [`react/jsx-space-before-closing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md)):

```js
// good
<TextInput type="email" name="email" htmlFor="email" />

// bad (missing space before self-closing tag)
<TextInput type="email" name="email" htmlFor="email"/>

// bad (too much spacing before self-closing tag)
<TextInput type="email" name="email" htmlFor="email"      />

// bad (not self-closing w/ no content)
<TextInput type="email" name="email" htmlFor="email"></TextInput>
```

**[⬆ back to top](#table-of-contents)**

## JSX attribute values

### Quoting

Always use double quotes (`"`) for JSX attribute values (eslint: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)):

```js
// good
<TextInput type="email" name="email" htmlFor="email" />

// bad (uses single quotes instead of double quotes)
<TextInput type='email' name='email' htmlFor='email' />
```

**[⬆ back to top](#table-of-contents)**

### Boolean values

A `true` prop value must be explicitly specified as the attribute value (eslint [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)):

```js
// good
<TextInput type="email" required={true} />

// bad (missing explicit `true` value)
<TextInput type="email" required />
```

**[⬆ back to top](#table-of-contents)**

### Curly brace padding

When passing a variable to a prop, the curly braces should **not** be padded by spaces (eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)) and neither should the equals (eslint: [`react/jsx-equals-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md)):

```js
// good
<TextInput defaultValue={value} />

// bad (padding within curly braces)
<TextInput defaultValue={ value } />

// bad (padding around equals)
<TextInput defaultValue = {value} />
```

**[⬆ back to top](#table-of-contents)**

## State

### Initializing

Coming soon...

**[⬆ back to top](#table-of-contents)**

### Dynamic data

Coming soon...

**[⬆ back to top](#table-of-contents)**

### Defaulting from props

Coming soon...

**[⬆ back to top](#table-of-contents)**

### Resetting

Coming soon...

**[⬆ back to top](#table-of-contents)**
