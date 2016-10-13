# Eventbrite React Testing Best Practices

Guidelines and best practices used by Eventbrite to provide consistency and prevent errors in testing React components. This does not cover testing utility/helper functions (including Redux reducers) that are used in conjunction with React as those follow general testing guidelines.

## Table of Contents

0. [Testing environment](#testing-environment)
0. [Finding nodes](#finding-nodes)
0. [Finding components](#finding-components)
0. [Assertion helpers](#assertion-helpers)
0. [Types of renders](#types-of-renders)
0. [Testing re-renders](#testing-re-renders)
0. [Testing markup](#testing-markup)
0. [Testing events](#testing-events)
0. [Testing state](#testing-state)

## Testing environment

Eventbrite uses [`chai`](http://chaijs.com) (`expect` [BDD style](http://chaijs.com/api/bdd/)), [`enzyme`](https://github.com/airbnb/enzyme) and [`sinon`](http://sinonjs.org/) for unit testing React components. We also leverage [`chai-enzyme`](https://github.com/producthunt/chai-enzyme) and [`sinon-chai`](https://github.com/domenic/sinon-chai) assertion helpers. Enzyme wraps [`ReactTestUtils`](https://facebook.github.io/react/docs/test-utils.html), which contains a bunch of primitives for testing components. Don't use `ReactTestUtils` directly; use Enzyme!

**[⬆ back to top](#table-of-contents)**

## Finding nodes

Search for nodes within a component by adding `data-spec` attributes to them. In the past, Eventbrite used special `js-*` CSS classes for references to nodes in JavaScript code. These `js-*` classes were also used when testing as well. Now with React testing, instead of using special CSS classes, [refs](https://github.com/eventbrite/javascript/tree/master/react#refs), or attempting to traverse the DOM with Enzyme's [`find`](https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/find.md) helper, we use `data-spec` attributes.

The `data-spec` attribute is specific to testing and not tied to presentation like CSS classes would be. If we decide to rename or remove a CSS class, the tests should not be impacted because there is no implicit link between styles and tests. We leverage two helpers, `getSingleSpecWrapper` & `getSpecWrappers` to find nodes with the `data-spec` attribute. Suppose we had the following (simplified) generated markup for a `Notification` component:

```html
<div class="notification">
    <button class="notification__close" data-spec="notification-close">X</button>
    <p class="notification__message">
        You have successfully registered for this event!
    </p>
    <a href="https://www.eventbrite.com/d/" class="notification__more-link" data-spec="notification-more-link">Browse all events</a>
</div>
```

Tests using `getSingleSpecWrapper` would look like:

```js
// good
it('has more link pointing to browse URL when `type` is browse', () => {
    let wrapperInstance = mount(<Notification type="browse" />);
    let moreLinkWrapper = getSingleSpecWrapper(wrapperInstance, 'notification-more-link');

    expect(moreLinkWrapper).to.have.attr('href', 'https://www.eventbrite.com/d/');
});

// bad (searches by tag name and CSS class)
it('has more link pointing to browse URL when `type` is browse', () => {
    let wrapperInstance = mount(<Notification type="browse" />);
    let moreLinkWrapper = wrapperInstance.find('a.notification__more-link');

    expect(moreLinkWrapper).to.have.attr('href', 'https://www.eventbrite.com/d/');
});
```

As a reference, here are the implementations for both helpers:

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

**[⬆ back to top](#table-of-contents)**

## Finding components

You can find a component simply by using Enzyme's [`find`](https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/find.md) and passing the component class:

```js
it('should render a checked checkbox if it is selected', () => {
    let wrapperInstance = mount(<Component isSelected={true} />);
    let checkboxWrapper = wrapperInstance.find(Checkbox);

    expect(checkboxWrapper).to.have.prop('isChecked', true);
});
```

This works as long as there's only one `Checkbox` rendered within `Component`. If there are multiple `Checkbox` components within `Component`, `checkboxWrapper` would have multiple elements in it. Instead you can add a `data-spec` attribute to the specific `Checkbox` and use `getSingleSpecWrapper`:

```js
// good
it('should render a checked checkbox if it is selected', () => {
    let wrapperInstance = mount(<Component isSelected={true} />);

    // pass the component class as the third parameter to `getSingleSpecWrapper`
    let selectAllCheckboxWrapper = getSingleSpecWrapper(wrapperInstance, 'component-selectAll', Checkbox);

    expect(selectAllCheckboxWrapper).to.have.prop('isChecked', true);
});

// bad (finds the appropriate Checkbox based on source order)
it('should render a checked checkbox if it is selected', () => {
    let wrapperInstance = mount(<Component isSelected={true} />);
    let selectAllCheckboxWrapper = wrapperInstance.find(Checkbox).at(2);

    expect(selectAllCheckboxWrapper).to.have.prop('isChecked', true);
});
```

The key in the "good" example is the third parameter passed to `getSingleSpecWrapper`. By default `getSingleSpecWrapper` will try to find a node with the specified `data-spec`. But if you specify the component class (`Checkbox` in this case), it'll return a reference to the component wrapper.

**[⬆ back to top](#table-of-contents)**

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

When the "good" assertion (using `chai-enzyme`'s [`prop`](https://github.com/producthunt/chai-enzyme#propkey-val) helper) fails, you'll receive an error such as:

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

## Testing re-renders

**[⬆ back to top](#table-of-contents)**

## Testing markup

**[⬆ back to top](#table-of-contents)**

## Testing events

**[⬆ back to top](#table-of-contents)**

## Testing state

**[⬆ back to top](#table-of-contents)**
