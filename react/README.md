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
0. [Component methods](#component-methods)
0. [JSX wrapping](#jsx-wrapping)
0. [JSX alignment](#jsx-alignment)
0. [JSX attribute values](#jsx-attribute-values)
0. [React `key` prop](#react-key-prop)
0. [Event handlers](#event-handlers)
0. [State](#state)
0. [Refs](#refs)
0. [Dangerous props](#dangerous-props)

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
- [`propTypes`](#component-proptypes) are defined _within_ the ES6 class, but have to be defined as additional properties _outside_ of a stateless function
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

### Defining `propTypes`

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

### Props naming

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

### `propTypes` Ordering

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

### Vague `propTypes`

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

## Component methods

### Private helper methods

JavaScript doesn't (yet) have a mechanism for declaring a method as `private`, which would only allow the class to call the method. As a quick signal that a React component method helper is private prefix it with underscore (`_`):

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    }

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <input type="text" onChange={this._handleChange.bind(this)} />
        );
    }
}

// bad (private method does not start with `_`)
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    }

    handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <input type="text" onChange={this._handleChange.bind(this)} />
        );
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Method ordering

For consistency and ease of finding methods within a React component, the order of methods should be as follows (eslint [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)):

  0. `propTypes`
  0. `contextTypes`
  0. `childContextTypes`
  0. `defaultProps`
  0. `state`
  0. `getChildContext`
  0. `componentWillMount`
  0. `componentDidMount`
  0. `componentWillReceiveProps`
  0. `shouldComponentUpdate`
  0. `componentWillUpdate`
  0. `componentDidUpdate`
  0. `componentWillUnmount`
  0. event handlers (like `_handleChange`)
  0. getters called from `render` (like `_getType()`)
  0. helper render methods (like `_renderSubHeading()`)
  0. `render`

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
<TextInput type="email" name="email" id="email" tabIndex="0" />
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

## React `key` prop

### Mandatory `key` prop

When rendering an array of React components, specify the `key` prop for each component in the array to aid React's Virtual DOM diffing algorithm (eslint: [`react/jsx-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md)):

```js
// good
export default class NamesList extends React.Component {
    static propTypes = {
        names: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string,
                name: React.PropTypes.string
            })
        ).isRequired
    }

    render() {
        let {names} = this.props;
        let nameItems = names.map(({id, name}) => (
            <NameItem key={id} name={name} />
        ));

        return (
            <div>{nameItems}</div>
        );
    }
}

// bad (fails to specify `key` prop in loop)
export default class NamesList extends React.Component {
    static propTypes = {
        names: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string,
                name: React.PropTypes.string
            })
        ).isRequired
    }

    render() {
        let {names} = this.props;
        let nameItems = names.map(({id, name}) => (
            <NameItem name={name} />
        ));

        return (
            <div>{nameItems}</div>
        );
    }
}
```

Not specifying `key` will not only be an ESLint error, but React will also display a warning messaging in the console complaining that it's missing. It really is critical for performance. For more info, see: [Multiple Components | Dynamic Children](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children).

**[⬆ back to top](#table-of-contents)**

### Index as `key`

Avoid passing the loop iteration index as the `key` prop, as this ends up confusing React's Virtual DOM diffing algorithm. Instead, always use an id or something else that uniquely identifies each item in the array:

```js
// good
export default class NamesList extends React.Component {
    static propTypes = {
        names: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string,
                name: React.PropTypes.string
            })
        ).isRequired
    }

    render() {
        let {names} = this.props;
        let nameItems = names.map(({id, name}) => (
            <NameItem key={id} name={name} />
        ));

        return (
            <div>{nameItems}</div>
        );
    }
}

// bad (uses array index as a key)
export default class NamesList extends React.Component {
    static propTypes = {
        names: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string,
                name: React.PropTypes.string
            })
        ).isRequired
    }

    render() {
        let {names} = this.props;
        let nameItems = names.map(({name}, nameIndex) => (
            <NameItem key={nameIndex} name={name} />
        ));

        return (
            <div>{nameItems}</div>
        );
    }
}
```

Keep in mind that the data uniquely identifies each item in the array could be the item itself in the case of an array of strings or numbers. For more info, see: [Index as `key` is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.zcyttevkz).

**[⬆ back to top](#table-of-contents)**

## Event handlers

### Event handler naming

React doesn't support two-way binding. Parent components can update their children by passing props. Child components can communicate with their parent by calling callback functions (also passed by parents to children via props). Prefix the name of the props with `on` and the internal method handler with `_handle` (eslint: [`react/jsx-handler-names`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)):

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    }

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <input type="text" onChange={this._handleChange.bind(this)} />
        );
    }
}

// bad (callback prop is not prefixed with `on`)
export default class TextInput extends React.Component {
    static propTypes = {
        // this should be named `onChange`
        change: React.PropTypes.func
    }

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.change) {
            this.props.change(value);
        }
    }

    render() {
        return (
            <input type="text" onChange={this._handleChange.bind(this)} />
        );
    }
}

// bad (event handler is not prefixed with `_handle`)
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    }

    _onChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        <input type="text" onChange={this._onChange.bind(this)} />
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Semantic event handler names

If you are defining an event handler prop that is wrapping a DOM event, you should name your prop semantically without tying it to the underlying DOM event that triggered it.

For example, let's say you have a pagination component (`Pagination`) that contains a bunch child `Button` components for each page (1, 2, 3, etc). When clicking a `Button`, in the `_handleClick` handler within the `Pagination`, it updates the components [state](#state) to reflect the current page.

The component wants to also notify the parent component in `_handleClick` that the page has changed. That prop should be called something semantic like `onPageChange` instead of `onPageClick`. This way if the DOM interaction that triggers the page changes (such as a hover), the event handler name doesn't have to change as well.

```js
// good (uses semantic onPageChange event handler name)
export default class Pagination React.Component {
    static propTypes = {
        onPageChange: React.PropTypes.func
    }
    state = {
        page: 1
    }

    _handlePageClick(e, page) {
        this.setState({page});

        let {onPageChange} = this.props;

        if (onPageChange) {
            onPageChange(page);
        }
    }

    render() {
        let buttons = [1, 2, 3, 4, 5].map((page) => (
            <Button onClick={this._handlePageClick.bind(this, page)} />
        ));

        return (
            <div>{buttons}</div>
        )
    }
}

// bad (event handler name is DOM-specific)
export default class Pagination React.Component {
    static propTypes = {
        onPageClick: React.PropTypes.func
    }
    state = {
        page: 1
    }

    _handlePageClick(e, page) {
        this.setState({page});

        let {onPageClick} = this.props;

        if (onPageClick) {
            onPageClick(page);
        }
    }

    render() {
        let buttons = [1, 2, 3, 4, 5].map((page) => (
            <Button onClick={this._handlePageClick.bind(this, page)} />
        ));

        return (
            <div>{buttons}</div>
        )
    }
}
```

**[⬆ back to top](#table-of-contents)**

### DOM event handling

When handling a DOM event that will be passed to the parent via a callback, avoid passing the entire DOM event object. Instead, narrow the component's API by only passing the minimal data that's needed.

If you pass the entire DOM event object:

- It's a leaky interface. The parent now has access to `event.taget` (among other properties) that gives it access to DOM nodes that it shouldn't have access to. At worst, it could manipulate or even remove those DOM nodes.
- It's a poor interface. Instead of being passed the data it will need directly, it now has to navigate within the event object to get the data it wants.
- It's a fragile interface. If you later want to change how the event is triggered, maybe another type of DOM event can also trigger it, the parents may now have to check the _type_ of event object it

As a result, this means that you must **always** handle DOM events it within the component even if it's just a wrapper. Otherwise the event object will still be implicitly returned:

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func
    }

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            // only the value is passed back
            this.props.onChange(value);
        }
    }

    // blur is explicitly handled even though it's a basic wrapper
    _handleBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    render() {
        <input
            type="text"
            onChange={this._handleChange.bind(this)}
            onBlur={this._handleBlur.bind(this)}
        />
    }
}

// bad (_handleChange passes entire event object back)
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func
    }

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _handleBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    render() {
        <input
            type="text"
            onChange={this._handleChange.bind(this)}
            onBlur={this._handleBlur.bind(this)}
        />
    }
}

// bad (blur event isn't wrapped, which implicitly passed back event object)
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func
    }

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _handleBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    render() {
        <input
            type="text"
            onChange={this._handleChange.bind(this)}
            onBlur={this.props.onBlur}
        />
    }
}
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

## Refs

Avoid using React refs. Both callback-style (eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)) and string (eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)) refs are prohibited by default.

React refs are a way to get references to underlying DOM nodes after the component has been mounted. This is needed when:

- You need to pass a reference to a DOM node to a non-React library (such as jQuery)
- You need to manually control a DOM node (such as to call `.focus()` on an input)

Generally when refs are used within React, it can be rewritten to use [state](#state) that will cause a re-render. This is a preferred approach because it keeps the code within the optimizations of React's Virtual DOM. Causing ESLint errors when React refs are used, strongly encourages the developer to rethink the approach.

However, if refs are needed, use callback-style refs and temporarily disable the ESLint rules:

```js
export default class RawContainer extends React.Component {
    render() {
        let innerHTML = {__html: '<span>Safe HTML</span>'};

        return (
            {/* eslint-disable react/jsx-no-bind */}
            <input type="text" ref={(input) => this._input = input} />
            {/* eslint-enable react/jsx-no-bind */}
        );
    }
}
```

This will be a clear signal in code reviews that a special exception is happening. If refs were universally accepted, it would be harder to distinguish between valid and incorrect uses of React refs.

For more info on React refs, see [Refs to Components](https://facebook.github.io/react/docs/more-about-refs.html).

**[⬆ back to top](#table-of-contents)**

## Dangerous props

Avoid using `dangerouslySetInnerHTML` (eslint: [`react/no-danger`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md)). This will through an ESLint **warning** instead of an error.

By default all text passed as content to HTML nodes are sanitized by React, preventing exploits. React is safe by default. However, if your text contains HTML you would like rendered, the HTML will be encoded instead of rendered.

Just like with [refs](#refs), using `dangerouslySetInnerHTML` is something that should be used sparingly. When it is truly needed, you can temporarily disable rule:

```js
export default class RawContainer extends React.Component {
    render() {
        let innerHTML = {__html: '<span>Safe HTML</span>'};

        return (
            {/* eslint-disable react/no-danger */}
            <div dangerouslySetInnerHTML={innerHTML} />
            {/* eslint-enable react/no-danger */}
        );
    }
}
```

Once again, this will be a clear signal in code reviews that a special exception is happening.

For more info on `dangerouslySetInnerHTML`, see: [Dangerously Set innerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).

**[⬆ back to top](#table-of-contents)**
