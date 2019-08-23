# Eventbrite JavaScript Refactors

> Guided refactorings of real (but redacted) Eventbrite Frontend code.

## [1. Logic and JSX](./logic-and-jsx)

> Refactoring a large `render()` method with lots of long if-then conditional
> logic into separate components and inline JSX logic. (Also: Reasons why
> destructuring is bad for refactoring code).

**Before:**

```js
class MyComponent extends React.Component {
    render() {
        let { foo, bar } = this.props;
        let { baz } = this.state;

        let element1 = null;
        let element2 = null;

        if (cond) {
            if (otherCond) {
                element1 = <SomeComponent kind="gah" foo={foo} baz={baz} />;
            } else {
                element2 = <SomeComponent kind="goop" bar={bar} baz={baz} />;
            }
        }

        return (
            <div>
                {element1}
                {element2}
            </div>
        );
    }
}
```

**After:**

```js
function Component1(props) {
    return <SomeComponent kind="gah" foo={props.foo} baz={props.baz} />;
}

function Component2(props) {
    return <SomeComponent kind="goop" bar={bar} baz={baz} />;
}

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                {cond && otherCond && (
                    <Component1 foo={this.props.foo} baz={this.state.baz} />
                )}
                {cond && !otherCond && (
                    <Component2 bar={this.props.bar} baz={this.state.baz} />
                )}
            </div>
        );
    }
}
```
