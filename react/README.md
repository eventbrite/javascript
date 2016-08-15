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
0. [`render()`](#render)
0. [State](#state)
0. [Dangerous props](#dangerous-props)
0. [Refs](#refs)
0. [Mounting](#mounting)
0. [Context](#context)
0. [Testing](testing.md)

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

Don't declare any of the `propTypes` as required if they are included in `defaultProps`:

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
        defaultValue: ''
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
        defaultValue: ''
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

### Boolean `propTypes`

Name boolean `propTypes` for a component such that their default value will be `false`. This way omitting a boolean value in the JSX that uses the component will be the same as specifying it as `false`. This may mean that a prop may need to be named negatively so that its default value will be `false`.

Avoid declaring boolean `propTypes` as required. Instead declare the default value, which should be `false`, in `defaultProps`. A client of the component shouldn't have to specify `false` in the JSX for a prop that could just be defaulted to `false`.

Use adjectives names for boolean `propTypes` that represent toggle state in the component. Ideally these adjectives will be begin with `is` or `has`. Use verb names for boolean `propTypes` that represent whether or not an action should happen within the component.

```js
// good
export default class Banner extends React.Component {
    static propTypes = {
        hideIcon: React.PropTypes.bool,
        isActive: React.PropTypes.bool,
        showError: React.PropTypes.bool
    }

    static defaultProps = {
        hideIcon: false,
        isActive: false,
        showError: false
    }
}

// bad (icon-related prop is mis-named such that default is true)
export default class Banner extends React.Component {
    static propTypes = {
        showIcon: React.PropTypes.bool,
        isActive: React.PropTypes.bool,
        showError: React.PropTypes.bool
    }

    static defaultProps = {
        showIcon: true,
        isActive: false,
        showError: false
    }
}

// bad (boolean prop type is declared as required)
export default class Banner extends React.Component {
    static propTypes = {
        hideIcon: React.PropTypes.bool.isRequired,
        isActive: React.PropTypes.bool,
        showError: React.PropTypes.bool
    }

    static defaultProps = {
        isActive: false,
        showError: false
    }
}

// bad (props are ambiguously named)
export default class Banner extends React.Component {
    static propTypes = {
        icon: React.PropTypes.bool,
        active: React.PropTypes.bool,
        error: React.PropTypes.bool
    }

    static defaultProps = {
        icon: false,
        active: false,
        error: false
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

### `className` prop

Avoid defining a `className` prop for a component as its intent can be ambiguous. Will it overwrite the `className` set on the component's top-level node? Will it be merged in with the `className` set on the top-level node?

Ideally a parent component should not be controlling the styling of a child component, so specifying a child's `className` prop should be unnecessary. The child component should be 100% in charge of its visual display.

However, you may need to control the layout/positioning of a child component within a parent component. In this situation, the best solution is to wrap the child component in a `<div>` or `<span>` that the parent _does_ control so that the positioning styling can be added to that wrapper node.

In the limited cases where the wrapper node solution doesn't work, the child component can expose a `__containerClassName` prop, which the parent can specify to add layout-based CSS class(es) to. The prop begins with dunder (`__`) to indicate that it is an exceptional case so that in can easily be spotted in code review.

```js
// good (parent uses wrapper `<div>` to position child)

// Child.js
export default class Child extends React.Component {
    // code for Child component
}

// Parent.js
export default class Parent extends React.Component {
    render() {
        return (
            <div className="parent">
                <h2 className="parent__heading">Parent</h2>

                <div className="parent__child">
                    <Child />
                </div>
            </div>
        );
    }
}


// less-than-ideal, but acceptable
// (parent uses `__containerClassName` prop to position child)

// Child.js
export default class Child extends React.Component {
    static propTypes = {
        // other propTypes
        __containerClassName: React.PropTypes.string
    }

    render() {
        let {__containerClassName} = this.props;
        let className = 'child';

        return (
            <div className=`${className} ${__containerClassName}`>

            </div>
        );
    }
}

// Parent.js
export default class Parent extends React.Component {
    render() {
        return (
            <div className="parent">
                <h2 className="parent__heading">Parent</h2>

                <Child __containerClassName="parent__child" />
            </div>
        );
    }
}


// bad (parent specifies VISUAL STYLING with `__containerClassName` prop)

// Child.js
export default class Child extends React.Component {
    static propTypes = {
        // other propTypes
        __containerClassName: React.PropTypes.string
    }

    render() {
        let {__containerClassName} = this.props;
        let className = 'child';

        return (
            <div className=`${className} ${__containerClassName}`>

            </div>
        );
    }
}

// Parent.js
export default class Parent extends React.Component {
    render() {
        return (
            <div className="parent">
                <h2 className="parent__heading">Parent</h2>

                <Child __containerClassName="text--red" />
            </div>
        );
    }
}


// bad (child defines `className` prop instead of `__containerClassName`)

// Child.js
export default class Child extends React.Component {
    static propTypes = {
        // other propTypes
        className: React.PropTypes.string
    }

    render() {
        let {propsClassName} = this.props;
        let className = 'child';

        return (
            <div className=`${className} ${propsClassName}`>

            </div>
        );
    }
}

// Parent.js
export default class Parent extends React.Component {
    render() {
        return (
            <div className="parent">
                <h2 className="parent__heading">Parent</h2>

                <Child className="parent__child" />
            </div>
        );
    }
}
```

By the way, instead of concatenating `className` strings yourself (as done in the examples above), use the [`classnames`](https://github.com/JedWatson/classnames) library.

**[⬆ back to top](#table-of-contents)**

## Helper components

When a component contains a lot of markup or it contains significant logic that determines how its markup should appear, use helper components to keep `render()` as small as possible. Instead of using `class` declarations for these helper components, use [stateless functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). Because these components are only useful to the main component and only exist to keep `render()` lean, these helper components shouldn't be placed in their own files, nor should they be `export`ed within the main component.

Let's look at a simple example. Let's say you had a global footer that contained a section with links to important top-level pages, another section with a bunch of links for SEO (😐), a section of links to all of  your top-level domains (.com, .co.uk, etc), and a final section of links to all of your social media accounts.

Properly using helper components, this would look like:

```js
// good (clean render w/ help of helper components)

// using arrow functions for stateless functions
const SiteLinks = () => (
    <ul className="global-footer__site-links">
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/help">Help</a></li>
        <li><a href="/careers">Careers</a></li>
    </ul>
);

// arrow function takes in props object
const SeoLinks = (props) => {
    let linkItems = props.links.map((link) => (
        <li><a key={link.url} href={link.url}>{link.label}</a></li>
    ));

    return (
        <ul className="global-footer__seo-links">
            {linkItems}
        </ul>
    );
};

// arrow function immediately destructures props object into
// `allTlds` and `currentTld`
const DomainLinks = ({allTlds, currentTld}) => {
    // use destructuring to immediately pull out `allTlds` & `currentTld`

    // filter out the current tld and then map to <li>
    let domainItems = allTlds.filter((tldInfo) => tldInfo.tld !== currentTld)
        .map(({tld, url, label}) => (
            <li><a key={tld} href={url}>{label}</a></li>
        ));

    return (
        <ul className="global-footer__domain-links">
            {domainItems}
        </ul>
    );
};

// arrow function immediately destructures props object into `links`
const SocialLinks = ({links}) => {
    // Return null to indicate you want nothing rendered
    // Returning `undefined` will cause a render error
    if (!links) {
        return null;
    }

    let socialItems = links.map(({url, label}) => (
        <li><a key={url} href={url}>{label}</a></li>
    ));

    return (
        <ul className="global-footer__social-links">
            {socialItems}
        </ul>
    );
};

export default class GlobalFooter extends React.Component {
    static propType = {
        allTlds: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                tld: React.PropTypes.string.isRequired,
                url: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        ).isRequired,
        currentTld: React.PropTypes.string.isRequired,
        seoLinks: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                url: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        ).isRequired,

        // socialLinks are optional
        socialLinks: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                url: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        )
    }

    render() {
        let {allTlds, currentTld, seoLinks, socialLinks} = this.props;

        return (
            <div className="global-footer">
                <SiteLinks />
                <SeoLinks links={seoLinks} />
                <DomainLinks allTlds={allTlds} currentTld={currentTld} />
                <SocialLinks links={socialLinks} />
            </div>
        );
    }
}
```

As you can see, with this best practice, the `render()` of `GlobalFooter` is really clean. It's immediately obvious that the global footer consists of site, SEO, domain and social links. The `GlobalFooter` is composed of these helper components in true React style. Furthermore, if more content is needed for a given section, it's easy for the developer to know where to add code, and `render()` of `GlobalFooter` doesn't need to grow.

Let's take a look at the "bad" approach:

```js
// bad (longer, less maintainable render)
export default class GlobalFooter extends React.Component {
    static propType = {
        allTlds: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                tld: React.PropTypes.string.isRequired,
                url: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        ).isRequired,
        currentTld: React.PropTypes.string.isRequired,
        seoLinks: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                url: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        ).isRequired,

        // socialLinks are optional
        socialLinks: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                url: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        )
    }

    render() {
        let {allTlds, currentTld, seoLinks, socialLinks} = this.props;
        let seoItems = seoLinks.map((link) => (
            <li><a key={link.url} href={link.url}>{link.label}</a></li>
        ));
        let domainItems = allTlds.filter((tldInfo) => tldInfo.tld !== currentTld)
            .map(({tld, url, label}) => (
                <li><a key={tld} href={url}>{label}</a></li>
            ));
        let socialItems;

        if (socialLinks) {
            socialItems = socialLinks.map(({url, label}) => (
                <li><a key={url} href={url}>{label}</a></li>
            ));
        }

        return (
            <div className="global-footer">
                <ul className="global-footer__site-links">
                    <li><a href="/about">About</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/help">Help</a></li>
                    <li><a href="/careers">Careers</a></li>
                </ul>
                <ul className="global-footer__seo-links">
                    {seoItems}
                </ul>
                <ul className="global-footer__domain-links">
                    {domainItems}
                </ul>
                <ul className="global-footer__social-links">
                    {socialItems}
                </ul>
            );
            </div>
        );
    }
}
```

So why is this code "bad" when it looks like _less_ code? In it's current state, there's actually nothing inherently wrong with the code. If the `GlobalFooter` was going to remain in this state _forever_, then this code would be just fine. The use of BEM-style CSS classes plus [separating logic from of the JSX](#logic-and-jsx) make `render()` pretty readable in its current state.

However, as we all know code has entropy; over time it'll change as new functionality is added and other is removed. If the markup becomes more than a simple unordered list or the logic determining what should be rendered becomes more complicated, having everything mixed together in `render()` will slowly become unwieldy. A code refactor would be needed, but with everything intertwined that could prove to be a big challenge.

Better to start the code on the right foot.

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

### `children` prop

Do not pass the special `children` prop to a component using a JSX attribute. Instead, pass the `children` in the contents of the JSX tag:

```js
// good
render() {
    return (
        <Parent color="yellow">
            <Child />
        </Parent>
    );
}


// bad (passes child via the `children` JSX attribute)
render() {
    let child = (<Child />);

    return (
        <Parent color="yellow" children={child} />
    );
}
```

For more on the special `children` prop, see: [Multiple Components: Children](https://facebook.github.io/react/docs/multiple-components#children).

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
        return (
            <input type="text" onChange={this._onChange.bind(this)} />
        );
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
            <Button key={page} onClick={this._handlePageClick.bind(this, page)} />
        ));

        return (
            <div>{buttons}</div>
        );
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
            <Button key={page} onClick={this._handlePageClick.bind(this, page)} />
        ));

        return (
            <div>{buttons}</div>
        );
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
        return (
            <input
                type="text"
                onChange={this._handleChange.bind(this)}
                onBlur={this._handleBlur.bind(this)}
            />
        );
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
        return (
            <input
                type="text"
                onChange={this._handleChange.bind(this)}
                onBlur={this._handleBlur.bind(this)}
            />
        );
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
        return (
            <input
                type="text"
                onChange={this._handleChange.bind(this)}
                onBlur={this.props.onBlur}
            />
        );
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Event handling in loops

Chances are that if you are passing event handlers to child components created in a loop, you're going to need some way to uniquely identify which child component caused the event handler to occur. Pass additional arguments to [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) to include the unique identifier:

```js
// shared data
const TEAMS = {
    'warriors': {
        name: 'Golden State Warriors',
        url: 'http://www.nba.com/warriors'
    },
    '49ers': {
        name: 'San Francisco',
        url: 'http://www.49ers.com'
    },
    'raiders': {
        name: 'Oakland Raiders',
        url: 'http://www.raiders.com'
    },
    'giants': {
        name: 'San Francisco Giants',
        url: 'http://sanfrancisco.giants.mlb.com'
    },
    'athletics': {
        name: 'Oakland Athletics',
        url: 'http://oakland.athletics.mlb.com'
    },
    'sharks': {
        name: 'San Jose Sharks',
        url: 'http://sharks.nhl.com'
    }
};


// good
export default class TeamPicker extends React.Component {
    _handleTeamClick(teamId) {
        location.href = TEAMS[teamId].url;
    }

    render() {
        let teamButtons = Object.keys(TEAMS).map((teamId) => (
            <button onClick={this._handleTeamClick.bind(this, teamId)} key={teamId}>
                {TEAMS[team].name}
            </button>
        ));

        return (
            <div>
                <h2>Pick your team</h2>
                <div>{teamButtons}</div>
            </div>
        );
    }
}


// bad (stores the teamId in the DOM `data-teamId`
// in order to retrieve it onClick)
export default class TeamPicker extends React.Component {
    _handleTeamClick(e) {
        let teamId = e.target.dataset.teamId;

        location.href = TEAMS[teamId].url;
    }

    render() {
        let teamButtons = Object.keys(TEAMS).map((teamId) => (
            <button data-teamId={teamId} onClick={this._handleTeamClick.bind(this)} key={teamId}>
                {TEAMS[team].name}
            </button>
        ));

        return (
            <div>
                <h2>Pick your team</h2>
                <div>{teamButtons}</div>
            </div>
        );
    }
}
```

While the two examples above look very similar, the differences make all the difference.

In the _good_ example, we pass the `teamId` to the [`.bind()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) such that when the `onClick` handler is invoked, the `teamId` is the first parameter in `_handleTeamClick`. This is accomplished with: `this._handleTeamClick.bind(this, teamId)`.

 This prevents the need to store the identifier in the DOM using the `data-teamId` attribute in the _bad_ example. The reason that this is "bad" is because the code now has to unnecessarily touch the DOM in order to retrieve `teamId`, when JavaScript already has the value.

 In this contrived example, the performance difference between _good_ and _bad_ is likely negligible, but at scale, a lot of unnecessary DOM accesses can really slow down an app. Always adhering to this good practice should prevent the need to go hunting for performance bottlenecks in an existing large app.

**[⬆ back to top](#table-of-contents)**

### Updating state

If an event handler needs to both update its internal [state](#state) **AND** call a prop callback, update the internal state first before calling the callback:

```js
// good
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    }

    state = {value: ''}

    _handleChange(e) {
        let value = e.target.value;

        // update state before calling `onChange` prop callback
        this.setState({value});

        if (this.props.onChange) {
            // only the value is passed back
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this._handleChange.bind(this)}
            />
        );
    }
}

// bad (calls `setState` after calling `onChange` prop callback)
export default class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func
    }

    state = {value: ''}

    _handleChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            // only the value is passed back
            this.props.onChange(value);
        }

        // don't setState after calling props callbacks!
        this.setState({value});
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this._handleChange.bind(this)}
            />
        );
    }
}
```

The vast majority of the time the order of setting the state versus calling props callbacks will not make any difference. But it is a good practice to do all the time in case you run into the unique situation where setting state afterwards can have adverse consequences.

In the example above, the `TextInput` component has no control of what happens when it calls `this.props.onChange`. The parent's `onChange` could do a lot of work that could occupy the main execution thread. And since JavaScript is single-threaded, it could be "a while" until execution returns to `TextInput` so that it could update its state via `this.setState({value})`. In a nutshell, we can trust what React is doing with `setState`, but not necessarily the callback props.

Jump down to the [State](#state) section below for more on handling state.

**[⬆ back to top](#table-of-contents)**

## `render()`

In addition to `render()` being the _last_ method in a component (see [Method ordering](#method-ordering)), we have additional best practices...

### Logic and JSX

React and JSX supporting logic and markup in the same file allows for substantial complexity in markup generation over other traditional templating languages (like [handlebars](http://handlebarsjs.com)). But with that increased complexity can come a decrease in readability.

In order to maximize both complexity and readability, we suggest keeping all logic out of JSX, except variable references and method calls. Expressions, particularly ternary expressions, should be stored in variables outside of JSX.

```js
// good
render() {
    let {includeHeader} = this.props;
    let buttons = [1, 2, 3, 4, 5].map((page) => (
        <Button key={page} onClick={this._handlePageClick.bind(this, page)} />
    ));
    let header;

    if (includeHeader) {
        header = (<h2>Pagination</h2>);
    }

    return (
        <div>
            {header}
            {buttons}
        </div>
    );
}

// bad (expressions in JSX)
render() {
    let {includeHeader} = this.props;

    return (
        <div>
            {includeHeader ? (<h2>Pagination</h2>) : null}
            {[1, 2, 3, 4, 5].map((page) => (
                <Button key={page} onClick={this._handlePageClick.bind(this, page)} />
            ))}
        </div>
    );
}
```

The above "bad" example doesn't seem so bad right? But as we know, code tends to grow over time. If we add more expressions, add more markup to the header, or the map gets more more logic, the code will become unwieldy. Setting up this guideline, even in the most simple examples, helps set the code along the right path.

See [Helper components](#helper-components) for another way to help keep `render()` lean.

**[⬆ back to top](#table-of-contents)**

### Hiding elements

With React's optimized re-rendering via its Virtual DOM abstraction, you should never need to hide elements with CSS (except maybe with some sophisticated CSS animations). Instead, don't render the element when it shouldn't be visible, and render it when it should:

```js
// good
export default class Togglr extends React.Component {
    state = {visible: false}

    _handleToggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        let {visible} = this.state;
        let message;

        if (visible) {
            message = (
                <p>This message is toggled on/off with React not CSS!</p>
            );
        }

        return (
            <div>
                <Button click={this._handleToggle.bind(this)}>Toggle!</Button>
                {message}
            </div>
        );
    }
}

// bad (uses CSS to hide element instead of not rendering)
export default class Togglr extends React.Component {
    state = {visible: false}

    _handleToggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        let {visible} = this.state;
        let messageClassName;

        if (!visible) {
            messageClassName = 'hidden';
        }

        return (
            <div>
                <Button click={this._handleToggle.bind(this)}>Toggle!</Button>
                <p className={messageClassName}>
                    This message is toggled on/off with CSS 🙁!
                </p>
            </div>
        );
    }
}
```

_Friendly reminder:_ If you want an **entire** component to be conditionally rendered, the component must return `null`. Returning `undefined` will be an error.

**[⬆ back to top](#table-of-contents)**

## State

There are two ways of maintaining data in a React component: props and state.

**Props** are used by a component's parent to configure the component and are immutable within the component.

**State** is internal to the component so that it can maintain data that will change over time. Whenever the state changes (via [`setState`](https://facebook.github.io/react/docs/component-api.html#setstate)), the component will re-render. A component's state should not be manipulated outside of it.

### Initializing

We rely on the [Class fields proposal](https://github.com/jeffmo/es-class-fields-and-static-properties) for initialize state over assigning `this.state` in the constructor so that it's more declarative. We don't use `getInitialState` which was the only option in ES5.

```js
// good
export default class Togglr extends React.Component {
    state = {visible: false}

    // rest of the component
}

// bad (assigns `this.state` unnecessarily in constructor)
export default class Togglr extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {visible: false};
    }

    // rest of the component
}

// bad (uses ES5 `getInitialState`)
export default class Togglr extends React.Component {
    getInitialState() {
        return {visible: false};
    }

    // rest of the component
}
```

**[⬆ back to top](#table-of-contents)**

### Defaulting from props

In general, using props to generate state is an anti-pattern because it results in duplicate "sources of truth" (see [Props in getInitialState as an anti-pattern](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)). But if your props is properly named to indicate that it's only used as seed data for the component's internally-controlled state, it's no longer an anti-pattern.

We tend to prefix these types of props with `default*` to match the `defaultValue` prop React uses for input elements. `initial*` is also a good prefix.

When defaulting from props, using the declarative class field no longer works as the props are not available in static scope. The only option is to initialize within the `constructor`:

```js
// good
export default class Togglr extends React.Component {
    constructor(props, context) {
        super(prop, context);
        this.state = {visible: props.defaultVisible};
    }

    // rest of the component
}

// bad (confusingly-named prop)
export default class Togglr extends React.Component {
    constructor(props, context) {
        super(prop, context);
        this.state = {visible: props.visible};
    }

    // rest of the component
}
```

In the "bad" example, both `props` and `state` have a property called `visible`, which is very confusing. Should you use `this.props.visible` or `this.state.visible`. The one in `props` cannot change, while the one in `state` can. Naming the prop `defaultVisible` (as shown in the "good" example) makes things clearer.

As a reminder, setting the state in the `constructor` should only be used when defaulting from props.

**[⬆ back to top](#table-of-contents)**

### Resetting

The most common use case for resetting state is a form that when submitted should return to its original default values. Resetting the state is as simple as setting it to the same object used to initialize it. To keep your code DRY, store the initial state in a constant so it can be used both for initialization and reset:

```js
// good
const INITIAL_STATE = {
    name: '',
    message: ''
}

export default ContactForm extends React.Component {
    state = {
        name: '',
        message: ''
    }

    _handleFormSubmit() {
        // code for submitting form

        // reset form (from const)
        this.setState(INITIAL_STATE);
    }

    render() {
        // render form w/ inputs
    }
}

// bad (duplicate initial state)
export default ContactForm extends React.Component {
    state = {name: '', message: ''}

    _handleFormSubmit() {
        // code for submitting form

        // reset form
        this.setState({
            name: '',
            message: ''
        });
    }

    render() {
        // render form w/ inputs
    }
}
```

In ES5, we could've just called `getInitialState` to reset the form state, but since we're using the declarative approach, we need to store the initial state object in a const.

**[⬆ back to top](#table-of-contents)**

### DOM state

Sometimes you will need to render different markup based on the presence of certain DOM APIs such as SVG support, touch support, CSS animation support, etc.

You may be tempted to use `state` to maintain the presence of the combination of DOM APIs, but since the value will not be changing over time, `state` is not the appropriate place for this data. Further, each component instance has its own unique state, and the presence of the DOM APIs will not change between instances. Therefore storing this `data` in state would also be redundant.

Instead use a private static variable to maintain this data:

```js
// good
import React from 'react';

// maintain a private that stores the combination of the
// DOM APIs
let SUPPORTS_FANCINESS;

const SvgLoading = () => {
    // code for an SVG loading display
};

const FallbackLoading = () => {
    // code for a fallback/image loading display
};

export default class Loading extends React.Component {
    _supportsFanciness() {
        if (SUPPORTS_FANCINESS === undefined && /* determine presence of DOM APIs */) {
            SUPPORTS_FANCINESS = true;
        }

        return SUPPORTS_FANCINESS;
    }

    render() {
        let loadingComponent = this._supportsFanciness
            ? (<SvgLoading />)
            : (<FallbackLoading />);

        return (
            <div>
                {loadingComponent}
            </div>
        );
    }
}


// bad (stores API state in `state`)
import React from 'react';

const SvgLoading = () => {
    // code for an SVG loading display
};

const FallbackLoading = () => {
    // code for a fallback/image loading display
};

export default class Loading extends React.Component {
    state = {
        supportsFanciness: false
    }

    componentDidMount() {
        if (/* determine presence of DOM APIs */) {
            this.setState({
                supportsFanciness: true
            })
        }
    }

    render() {
        let {supportsFanciness} = this.state;
        let loadingComponent = supportsFanciness
            ? (<SvgLoading />)
            : (<FallbackLoading />);

        return (
            <div>
                {loadingComponent}
            </div>
        );
    }
}
```

Setting state in [`componentDidMount`](#mounting) is a poor practice in general because it can result in unnecessary double calls to `render()`: the initial render and then the subsequent render as a result of `setState`. In fact we use the [`react/no-did-mount-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md) ESLint rule to prevent this.

However, in the "good" example, by storing `SUPPORTS_FANCINESS` in a private static variable, once the first component tries to render, the value will be calculated and subsequently cached. And we still only have one render.

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

## Refs

Avoid using React refs. Both callback-style (eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)) and string (eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)) refs are prohibited by default.

React refs are a way to get references to underlying DOM nodes after the component has been mounted. This is needed when:

- You need to pass a reference to a DOM node to a non-React library (such as jQuery)
- You need to manually control a DOM node (such as to call `.focus()` on an input)
- You need to manually inspect a DOM node (such as retrieve its dimensions)

Generally when refs are used within React, it can be rewritten to use [state](#state) that will cause a re-render. This is a preferred approach because it keeps the code within the optimizations of React's Virtual DOM. Causing ESLint errors when React refs are used, strongly encourages the developer to rethink the approach.

However, if refs are needed, use callback-style refs to store a instance reference to it:

```js
export default class RefContainer extends React.Component {
    render() {
        let refCallback = (input) => {
            // stores a reference to the input on the component instance
            // to be used later
            this._input = input;
        };

        return (
            <input type="text" ref={refCallback} />
        );
    }
}
```

For more info on React refs, see [Refs to Components](https://facebook.github.io/react/docs/more-about-refs.html).

**[⬆ back to top](#table-of-contents)**

## Mounting

React provides abstractions that free you from touching the DOM directly in most cases, but sometimes you simply need to interact with the DOM API as we saw in the previous section on [refs](#refs).

If you need to add event handlers to the `window` or `document`, there is no React component to which you can add an event handler. You're essentially breaking the default compositional nature of React, but reaching out to the global objects. But sometimes that is unavoidable.

Let's take an example where you would like to make a `fetch` API request and also listen to the `resize` event on the window. You would need to make use of the `componentDidMount` & `componentWillUnmount` lifecycle methods:

```
export default class App extends React.Component {
    state = {
        items: [],
        isSmall: true // mobile-first default
    }

    componentDidMount() {
        // Here in `componentDidMount` we *know* the DOM exists so we can safely
        // access DOM APIs

        // When the component has mounted we can make an AJAX request to get our
        // data
        fetch('/get-data')
            .then((resp) => resp.json())
            .then((responseData) => {
                this.setState({
                    items: responseData
                })
            });

        // store a reference to the handler we'll pass to resize so that it can
        // be detached later
        this._resizeHandler = () => {
            this._handleResizeViewPort();
        };

        // actually attach the handler to be called onResize
        // NOTE: You would probably want to throttle the resize event as it
        // fires frequently
        window.addEventListener('resize', this._resizeHandler);

        // handle the initial state before the first resize
        this._handleResizeViewPort();
    }

    componentWillUnmount() {
        // detach resize handler when the component is removed from the DOM
        window.removeEventListener('resize', this._resizeHandler);
    }

    _handleResizeViewPort() {
        let windowWidth = getWindowWidth();

        // update the state based on the window width
        this.setState({
            isSmall: windowWidth < 800
        });
    }

    render() {
        let {items, isSmall} = this.state;
        let filteredItems = items;

        // only use the first 10 items if the window is small
        if (isSmall) {
            filteredItems = filteredItems.slice(0, 10);
        }

        return (
            <List items={filteredItems} />
        );
    }
}
```

In the (contrived) example above, we want to limit the number of items we pass to the `<List />` component based upon the window size. And we receive those items from making an AJAX call (using the new [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)).

We have to wait until the DOM exists before we can make the AJAX call or inquire the size of the window. When the component is constructed and when `render()` is called, we are not guaranteed that the DOM exists (both are called, for instance, during server-side rendering as well). However, when the `componentDidMount` lifecycle method is called, we are guaranteed that the DOM exists and the component's DOM nodes have been rendered.

Finally, in `componentWillUnmount` we detach the handler we added. If the component gets removed from the DOM, we no longer need to continue watching on the resize of the window, so we need to explicitly detach the handler otherwise we'll introduce a memory leak.

As a reminder, `componentDidMount` is **only** for providing a hook to interact directly for the DOM. You should not use it as a delayed hook to generate [state](#state) that could have been calculated in the constructor.

For more on these lifecycle methods and others: [Component Specs and Lifecycle](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods).

**[⬆ back to top](#table-of-contents)**

## Context

Coming soon...

**[⬆ back to top](#table-of-contents)**

## Testing

See [Eventbrite React Testing Best Practices](testing.md)

**[⬆ back to top](#table-of-contents)**
