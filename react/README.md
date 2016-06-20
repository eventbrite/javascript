# Eventbrite React & JSX Coding Style Guide

[ESLint](http://eslint.org/) rules, guidelines and best practices used by Eventbrite to provide consistency and prevent errors in React and JSX code.

## Table of Contents

1. [What is React?](#what-is-react)
1. [What is JSX?](#what-is-jsx)
1. [General rules](#general-rules)
1. [Component files](#component-files)
1. [Component class](#component-class)
1. [Component organization](#component-organization)
1. [Component `propTypes`](#component-propTypes)

## What is React?

[React](https://facebook.github.io/react/) is a JavaScript-centric UI library. It abstracts away the DOM, giving a simpler programming model and better performance. It can also render on the server using Node, and can even power native apps using [React Native](https://facebook.github.io/react-native/). React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.

For more info, see [Getting started with React](https://facebook.github.io/react/docs/getting-started.html).

## What is JSX?

[JSX](https://facebook.github.io/jsx/) is a JavaScript syntax extension that looks similar to XML. We use it with React because it is a concise and familiar syntax for defining tree structures with attributes.

For more info, see [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html).

## General rules

- Always use JSX syntax (don't use `React.createElement`)

## Component files

- Use PascalCase for React component names, e.g. `TextInput`
- Use `.js` extension for React components
- Use the component name for filenames. E.g., `TextInput.js`

## Component class

Prefer ES6 classes over `React.createClass` (ESLint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md))

```jsx
// good
export default class MainComponent extends React.Component {

}

// bad
export default const MainComponent = React.createClass({

})
```

_NOTE:_ There is a common best practice to use stateless/pure functions over ES6 classes for components without any internal state (see ESLint: [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)), but we are choosing to stick with ES6 classes for a few reasons:

- When the component does more than just render `props` (such as attaching callback handlers), the stateless function can become unnecessarily complex
- [`propTypes`](#component-propTypes) are defined _within_ the ES6, but have to be defined as additional properties _outside_ of a stateless function
- Using ES6 classes for the main/default component help differentiate it from [helper components](#)

## Component organization

- Export only one component per file as the default (ESLint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md))

```jsx
// good

export default class MainComponent extends React.Component {

}


// bad

export class ComponentA extends React.Component {

}

export class ComponentB extends React.Component {

}
```

## Component `propTypes`

Coming soon...
