# Eventbrite React Testing Best Practices

Guidelines and best practices used by Eventbrite to provide consistency and prevent errors in testing React components. This does not cover testing utility/helper functions (including Redux reducers) that are used in conjunction with React.

## Table of Contents

0. [Testing environment](#testing-environment)
0. [Assertion helpers](#assertion-helpers)
0. [Types of renders](#types-of-renders)
0. [References to nodes](#references-to-nodes)
0. [Testing re-renders](#testing-re-renders)

## Testing environment

Eventbrite uses [`chai`](http://chaijs.com) (`expect` [BDD style](http://chaijs.com/api/bdd/)), [`enzyme`](https://github.com/airbnb/enzyme) and [`sinon`](http://sinonjs.org/) for unit testing React components. We also use [`chai-enzyme`](https://github.com/producthunt/chai-enzyme) and [`sinon-chai`](https://github.com/domenic/sinon-chai) assertion helpers.

`enzyme` has helpers for finding rendered components and nodes (via [`find`](https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/find.md)), but sometimes you have to assume the order of the component or node within its parent. As such, Eventbrite leverages two helper utilities that allow for easily searching for a component or node by adding a `data-spec` attribute to it. As a reference:

```js
// utils/unitTest.js

export const DATA_SPEC_ATTRIBUTE_NAME = 'data-spec';

/**
* Finds all instances of components in the rendered `componentWrapper` that are DOM components
* with the `data-spec` attribute matching `name`.
* @param {ReactWrapper} componentWrapper - Rendered componentWrapper (result of mount, shallow, or render)
* @param {string} specName - Name of `data-spec` attribute value to find
* @param {string|Function} typeFilter - (Optional) Expected type of the wrappers (defaults to all HTML tags)
* @returns {ReactComponent[]} All matching DOM components
*/
export const getSpecWrappers = (componentWrapper, specName, typeFilter) => {
    let specWrappers;

    if (!typeFilter) {
        specWrappers = componentWrapper.find(`[${DATA_SPEC_ATTRIBUTE_NAME}="${specName}"]`);
    } else {
        specWrappers = componentWrapper.findWhere((wrapper) => (
            wrapper.prop(DATA_SPEC_ATTRIBUTE_NAME) === specName && wrapper.type() === typeFilter
        ));
    }

    return specWrappers;
};

/**
* Like getSpecWrappers() but expects there to be one result, and returns that one result,
* or throws exception if there is any other number of matches besides one.
* @param {ReactWrapper} componentWrapper - Rendered componentWrapper (result of mount, shallow, or render)
* @param {string} specName - Name of `data-spec` attribute value to find
* @param {string|Function} typeFilter - (Optional) Expected type of the wrappers (defaults to all HTML tags)
* @returns {ReactComponent} Single matching DOM component
*/
export const getSingleSpecWrapper = (componentWrapper, specName, typeFilter) => {

    let specWrappers = getSpecWrappers(componentWrapper, specName, typeFilter);

    if (specWrappers.length !== 1) {
        throw new Error(`Expected single "${specName}" spec wrapper. Received: ${specWrappers.length}.`);
    }

    return specWrappers.first();
};
```

## Assertion helpers

Whenever possible, use `chai-enzyme` & `sinon-chai` assertion helpers in favor of the normal assertion helpers that just come with `chai`:

```js
// good (leverages `.prop` from `chai-enzyme`)
it('should render a checked checkbox if it is selected', () => {
    let wrapperInstance = mount(<Component isSelected={true} />);
    let checkboxWrapper = wrapperInstance.find(Checkbox);

    expect(checkboxWrapper).to.have.prop('isChecked', true);
});

// bad (just uses `enzyme` with vanilla `chai`)
it('should render a checked checkbox if it is selected', () => {
    let wrapperInstance = mount(<Component isSelected={true} />);
    let checkboxWrapper = wrapperInstance.find(Checkbox);

    expect(checkboxWrapper.prop('isChecked')).to.equal(true);
});
```

Functionally the "good" and "bad" assertions are the same. The assertions will both pass when the `isChecked` prop is `true` and both fail when it's `false`. The difference is in the reported error when they fail.

When the "good" (using `chai-enzyme`) assertion fails, you'll receive an error such as:

```console
AssertionError: expected the node in <div /> to have a 'isChecked' prop with the value true, but the value was false
```

However, when the "bad" assertion fails, you'll receive a more cryptic (and less helpful) error such as:

```console
AssertionError: expected false to equal true
```

The "good" example has significantly more context and should be significantly more helpful when looking through failed test logs.

**[⬆ back to top](#table-of-contents)**

## Types of renders

**[⬆ back to top](#table-of-contents)**

## References to nodes

**[⬆ back to top](#table-of-contents)**

## Testing re-renders

**[⬆ back to top](#table-of-contents)**
