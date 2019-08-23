# Logic and JSX Refactor

## Background

The code in [`OriginalFile.js`](0-OriginalFile.js) comes directly out of one of
our React apps in our Core repo. This file was becoming difficult to maintain,
and so we looked into refactoring it.

At the time this code was written, we had a React style guide rule about JSX
that says the following:

> React and JSX supporting logic and markup in the same file allows for
> substantial complexity in markup generation over other traditional templating
> languages (like handlebars). But with that increased complexity can come a
> decrease in readability.
>
> In order to maximize both complexity and readability, we suggest keeping all
> logic out of JSX, except variable references and method calls. Expressions,
> particularly ternary expressions, should be stored in variables outside of
> JSX.
>
> ```js
> // good
> render() {
>     let {includeHeader} = this.props;
>     let buttons = [1, 2, 3, 4, 5].map((page) => (
>         <Button key={page} onClick={this._handlePageClick.bind(this, page)} />
>     ));
>     let header;
>
>     if (includeHeader) {
>         header = (<h2>Pagination</h2>);
>     }
>
>     return (
>         <div>
>             {header}
>             {buttons}
>         </div>
>     );
> }
> ```
>
> ```js
> // bad (expressions in JSX)
> render() {
>     let {includeHeader} = this.props;
>
>     return (
>         <div>
>             {includeHeader ? (<h2>Pagination</h2>) : null}
>             {[1, 2, 3, 4, 5].map((page) => (
>                 <Button key={page} onClick={this._handlePageClick.bind(this, page)} />
>             ))}
>         </div>
>     );
> }
> ```
>
> The above "bad" example doesn't seem so bad right? But as we know, code tends
> to grow over time. If we add more expressions, add more markup to the header,
> or the map gets more more logic, the code will become unwieldy. Setting up
> this guideline, even in the most simple examples, helps set the code along the
> right path.

However, if you look at the `render()` method in
[`OriginalFile.js`](0-OriginalFile.js) you'll see that, despite following this
rule, it has become a bit of a mess.

Looking at it quickly, it's hard to tell what is rendered when and what data it
depends on and where that data comes from.

Let's refactor this component, ignoring the above rule, to see how we can
improve this real application code.

## Step 1: [`NoDestructuring.js`](1-NoDestructuring.js)

So the first step in untangling this render method is actually to eliminate the
large amount of destructuring that is happening on the `props`, `state`, and
some of the imports.

#### Before:

```js
import {
    ACCOUNT_SETTINGS_LIST_COLUMNS as columns,
    DELETION_ALLOWED,
    DELETION_EVENT_ASSOCIATED,
    DELETION_API_ERROR_ASSOCIATED,
    UPDATE_PAYMENT_INSTRUMENT_MODAL,
    FORM_FROM_INSTRUMENT_TYPE,
} from '../constants';

// ...

const {
    eventList = [],
    hideEventsModal,
    showEventsModal,
    isInstrumentTypeFilterActive = false,
    apiHandledErrors = null,
    getEvents,
    isEventsModalOpen = false,
    paymentInstruments: {
        userInstruments,
        pagination: {
            pageCount = PAYMENT_INSTRUMENT_PAGINATION.PAGE_SIZE,
            pageNumber = PAYMENT_INSTRUMENT_PAGINATION.DEFAULT_PAGE,
        } = {},
    } = {},
    isUpdateIntrumentModalOpen,
    hideUpdateInstrumentModal,
    isInProgressDialogOpen,
    hideInProgressDialog,
    canListPayoutUserInstruments,
} = this.props;

// ...

<Modal
    isShown={isUpdateIntrumentModalOpen}
    children={modalUpdateChildren}
    title={modalUpdateTitle}
    onClose={hideUpdateInstrumentModal}
    onSecondaryAction={hideUpdateInstrumentModal}
    secondaryText={UPDATE_PAYMENT_INSTRUMENT_MODAL.secondaryText}
    secondaryType="neutral"
    onPrimaryAction={this._handleClickUpdatePaymentInstrument}
    primaryText={UPDATE_PAYMENT_INSTRUMENT_MODAL.primaryText}
    primaryType="fill"
    onClickOutside={hideUpdateInstrumentModal}
/>;
```

#### After:

```js
import * as Constants from '../constants';

// ...

<Modal
    isShown={this.props.isUpdateIntrumentModalOpen}
    children={this.state.modalUpdateChildren}
    title={this.state.modalUpdateTitle}
    onClose={this.props.hideUpdateInstrumentModal}
    onSecondaryAction={this.props.hideUpdateInstrumentModal}
    secondaryText={Constants.UPDATE_PAYMENT_INSTRUMENT_MODAL.secondaryText}
    secondaryType="neutral"
    onPrimaryAction={this._handleClickUpdatePaymentInstrument}
    primaryText={Constants.UPDATE_PAYMENT_INSTRUMENT_MODAL.primaryText}
    primaryType="fill"
    onClickOutside={this.props.hideUpdateInstrumentModal}
/>;
```

We do this so all of the values we are referencing also include where we are
referencing them from. This makes it easy to move code around because we know
exactly where everything is coming from. Otherwise, we would have to track down
a bunch of variables to make sure we maintain the correct references.

## Step 2: [`SplitConditionals.js`](2-SplitConditionals.js)

In our original file we had a lot of long if-then statements, some of which were
nested. Inside of them we assigned a lot of JSX to variables we rendered later
on in the `render()` method.

Instead of this, we're going to split up all the JSX that is conditionally
assigned to variables into their own sections.

#### Before:

```js
let emptyState = null;
let bottomText = null;
let pagination = null;
let filterPrimaryText = null;
let filter = null;
let paymentInstrumentTable = null;
let eventsModal = null;
let errorDialog = null;
let paymentInstrumentModalsAndDialogs = null;
let filterValues = FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY;

// ...

paymentInstrumentTable = (
    <PaymentInstrumentTable items={paymentInstrumentsItems} />
);
if (isEmpty(paymentInstrumentsItems)) {
    if (this.props.isInstrumentTypeFilterActive) {
        filterPrimaryText = gettext('Remove filter');
    } else {
        paymentInstrumentTable = null;
    }
    emptyState = (
        <div className="eds-g-cell eds-g-cell-1-1 eds-l-mar-top-16 eds-align--center">
            ...
        </div>
    );
} else {
    pagination = (
        <div className="eds-g-cell eds-g-cell-1-1 eds-align--center">...</div>
    );
    // ... this goes on ...
}
```

#### After:

```js
// --------------------------------------------------------------------

let filterPrimaryText = null;
if (
    isEmpty(paymentInstrumentsItems) &&
    this.props.isInstrumentTypeFilterActive
) {
    filterPrimaryText = gettext('Remove filter');
}

// --------------------------------------------------------------------

let emptyState = null;
if (isEmpty(paymentInstrumentsItems)) {
    emptyState = (
        <div className="eds-g-cell eds-g-cell-1-1 eds-l-mar-top-16 eds-align--center">
            ...
        </div>
    );
}

// --------------------------------------------------------------------

let bottomText = null;
if (!isEmpty(paymentInstrumentsItems)) {
    bottomText = (
        <div className="eds-g-cell eds-align--left eds-text-bm eds-l-mar-top-4">
            ...
        </div>
    );
}

// --------------------------------------------------------------------

let pagination = null;
if (!isEmpty(paymentInstrumentsItems)) {
    pagination = (
        <div className="eds-g-cell eds-g-cell-1-1 eds-align--center">...</div>
    );
}

// --------------------------------------------------------------------
```

Now we have something much easier to move around and refactor in more meaningful
ways. We know exactly what is being rendered, when it is being rendered, and
what data it needs in order to render. All in nice independent chunks that can
be cut-and-pasted whereever we want it to go.

We might have repeated some of our conditional logic, and even made the code a
bit longer. But we've given ourselves something more meaningful:
Refactorability.

> **Aside:** It's hard to capture what exactly makes some code refactorable and
> other hard to refactor. But if you're having trouble refactoring some code,
> consider taking a few intermediate steps to untangle the code and make the
> refactor easy for yourself. It's far easier to do major refactors in
> individual steps than to try doing it all at once.

## Step 3: [`InlineLogic.js`](3-InlineLogic.js)

The next step we're going to take is going to go directly against the original
rule we started out with. We're going to move our conditionally rendered JSX
code directly into the `render()` method's `return (...)` JSX.

#### Before:

```js
let filter = (
    <InstrumentFilter
        onFilterChange={this._handleFilter}
        filterValue={this.state.filterValue}
        filterValues={filterValues}
    />
);

let eventsModal = null;
if (!isEmpty(paymentInstrumentsItems) && this.props.isEventsModalOpen) {
    eventsModal = (
        <EventsModal
            eventIds={this.state.eventIds}
            bankName={this.state.bankName}
            isShown={this.props.isEventsModalOpen}
            showEventsModal={this.props.showEventsModal}
            hideEventsModal={this.props.hideEventsModal}
            getEvents={this.props.getEvents}
            eventList={this.props.eventList}
        />
    );
}

let errorDialog = null;
if (
    !isEmpty(paymentInstrumentsItems) &&
    !isEmpty(this.props.apiHandledErrors)
) {
    errorDialog = (
        <Dialog
            isShown={this.state.isDeletionEmptyListDialogShown}
            message={this.props.apiHandledErrors.errors._error}
            title={Constants.DELETION_API_ERROR_ASSOCIATED.title}
            onClose={this._handleClose}
            onPrimaryAction={this._handleClose}
            primaryText={Constants.DELETION_API_ERROR_ASSOCIATED.primaryText}
            primaryType="link"
            onClickOutside={this._handleClose}
        />
    );
}

// ...

return (
    <div>
        {paymentInstrumentModalsAndDialogs}
        {filter}
        <div className="eds-g-cell eds-g-cell-1-1 eds-align--left eds-l-mar-top-4">
            {paymentInstrumentTable}
            {emptyState}
            {pagination}
        </div>
        {bottomText}
    </div>
);
```

#### After:

```js
return (
    <div>
        ...
        {!isEmpty(paymentInstrumentsItems) && this.props.isEventsModalOpen && (
            <EventsModal
                eventIds={this.state.eventIds}
                bankName={this.state.bankName}
                isShown={this.props.isEventsModalOpen}
                showEventsModal={this.props.showEventsModal}
                hideEventsModal={this.props.hideEventsModal}
                getEvents={this.props.getEvents}
                eventList={this.props.eventList}
            />
        )}
        ...
        {!isEmpty(paymentInstrumentsItems) &&
            !isEmpty(this.props.apiHandledErrors) && (
                <Dialog
                    isShown={this.state.isDeletionEmptyListDialogShown}
                    message={this.props.apiHandledErrors.errors._error}
                    title={Constants.DELETION_API_ERROR_ASSOCIATED.title}
                    onClose={this._handleClose}
                    onPrimaryAction={this._handleClose}
                    primaryText={
                        Constants.DELETION_API_ERROR_ASSOCIATED.primaryText
                    }
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
            )}
        ...
        <InstrumentFilter
            onFilterChange={this._handleFilter}
            filterValue={this.state.filterValue}
            filterValues={
                this.props.canListPayoutUserInstruments
                    ? FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY
                    : FinancialProfileConstants.INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY
            }
        />
        ...
    </div>
);
```

If you're not used to writing React code like this, it might seem objectionably
worse code. And you could make a pretty good argument that it is worse. We're
not quite done yet, but I would like to take a second to argue that this step in
our refactor is actually an improvement.

We still have the benefits we had from before. Looking at any one part of this
large chunk of JSX, we can easily tell what is being rendered, when it is being
rendered, and what data we need in order to render it (and where that data is
coming from).

But we now have an additional benefit: We can very easily see where things are
rendered in relation to one another. If we look at the "Before" code in
[`SplitConditionals.js`](2-SplitConditionals.js), we're creating a bunch of
variables that are kind of "floating", as in we don't immediately see where they
are used. And you'll notice that if you scroll down to the final returned JSX,
many of those variables aren't being referenced because they are actually used
inside of other chunks of JSX.

By putting all of the JSX into the `return ()`'d JSX, we can see it clearly as a
tree, which is going to make the next refactor easier.

## Step 4: [`PullIntoComponents.js`](3-PullIntoComponents.js)

Our final step in this refactor is going to be to take chunks of our
`return ()`'d JSX and pull them out into their own components.

#### Before:

```js
return (
    <div>
        {!isEmpty(paymentInstrumentsItems) &&
            !isEmpty(this.props.apiHandledErrors) && (
                <Dialog
                    isShown={this.state.isDeletionEmptyListDialogShown}
                    message={this.props.apiHandledErrors.errors._error}
                    title={Constants.DELETION_API_ERROR_ASSOCIATED.title}
                    onClose={this._handleClose}
                    onPrimaryAction={this._handleClose}
                    primaryText={
                        Constants.DELETION_API_ERROR_ASSOCIATED.primaryText
                    }
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
            )}
        ...
        <InstrumentFilter
            onFilterChange={this._handleFilter}
            filterValue={this.state.filterValue}
            filterValues={
                this.props.canListPayoutUserInstruments
                    ? FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY
                    : FinancialProfileConstants.INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY
            }
        />
        ...
        {isEmpty(paymentInstrumentsItems) && (
            <div className="eds-g-cell eds-g-cell-1-1 eds-l-mar-top-16 eds-align--center">
                <EmptyState
                    graphicType={<BankGraphicSvg />}
                    title={gettext('No payout methods')}
                    primaryText={
                        isEmpty(paymentInstrumentsItems) &&
                        this.props.isInstrumentTypeFilterActive
                            ? gettext('Remove filter')
                            : null
                    }
                    onPrimaryAction={this._handleFilter}
                />
            </div>
        )}
    </div>
);
```

#### After:

```js
function DeletionEmptyListDialog(props) {
    return (
        <Dialog
            isShown={props.isShown}
            message={props.message}
            title={Constants.DELETION_API_ERROR_ASSOCIATED.title}
            onClose={props.onClose}
            onPrimaryAction={props.onClose}
            primaryText={Constants.DELETION_API_ERROR_ASSOCIATED.primaryText}
            primaryType="link"
            onClickOutside={props.onClose}
        />
    );
}

// ...

function PayoutMethodSummaryInstrumentFilter(props) {
    return (
        <InstrumentFilter
            onFilterChange={props.onFilterChange}
            filterValue={props.filterValue}
            filterValues={
                props.canListPayoutUserInstruments
                    ? FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY
                    : FinancialProfileConstants.INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY
            }
        />
    );
}

// ...

function PayoutMethodSummaryEmptyState(props) {
    return (
        <div className="eds-g-cell eds-g-cell-1-1 eds-l-mar-top-16 eds-align--center">
            <EmptyState
                graphicType={<BankGraphicSvg />}
                title={gettext('No payout methods')}
                primaryText={
                    isEmpty(props.items) && props.isFilterActive
                        ? gettext('Remove filter')
                        : null
                }
                onPrimaryAction={props.onRemoveFilter}
            />
        </div>
    );
}

// ...

return (
    <div>
        {!isEmpty(paymentInstrumentsItems) &&
            !isEmpty(this.props.apiHandledErrors) && (
                <DeletionEmptyListDialog
                    isShown={this.state.isDeletionEmptyListDialogShown}
                    message={this.props.apiHandledErrors.errors._error}
                    onClose={this._handleClose}
                />
            )}
        ...
        <PayoutMethodSummaryInstrumentFilter
            onFilterChange={this._handleFilter}
            filterValue={this.state.filterValue}
            canListPayoutUserInstruments={
                this.props.canListPayoutUserInstruments
            }
        />
        ...
        {isEmpty(paymentInstrumentsItems) && (
            <PayoutMethodSummaryEmptyState
                items={paymentInstrumentsItems}
                isFilterActive={this.props.isInstrumentTypeFilterActive}
                onRemoveFilter={this._handleFilter}
            />
        )}
    </div>
);
```

Now our component's `render()` method is _just_ the information we care about
for the current component, it contains:

-   What is being rendered.
-   When it is being rendered.
-   What data it needs in order to render.
-   Where things render in relation to one another.
-   And finally (and this is important), **none of the information we don't care
    about to distract us.**

### Tip 1: Complex conditionals should be pulled into separate functions with data passed in

You'll notice that we've kept the inline conditionals. This is because overall
they are pretty simple conditionals, all of them are boolean values.

If we had something more complex, we might choose to pull that complexity back
out into "selectors" or utilities that we can call inline.

```js
// Before:
function MyComponent(props) {
    return (
        <div>
            {(props.foo === CONSTANT_VALUE && props.bar !== CONSTANT_VALUE) ||
                (props.foo !== CONSTANT_VALUE &&
                    props.bar === CONSTANT_VALUE && (
                        <div>Hello, I have a complex conditional render</div>
                    ))}
        </div>
    );
}

// After:
function xorEq(a, b, value) {
    if (a === value && b !== value) return true;
    if (a !== value && b === value) return true;
    return false;
}

function MyComponent(props) {
    return (
        <div>
            {xorEq(props.foo, props.bar, CONSTANT_VALUE) && (
                <div>Hello, I have a complex conditional render</div>
            )}
        </div>
    );
}
```

### Tip 2: Computed data should be pulled out into variables.

Doing more complex computations that create data for your JSX to render is tough
to do inline. So in those cases we'll choose to pull the data out into a
variable, and possibly pull the computation logic into its own function.

```js
// Before:
function MyComponent(props) {
    return (
        <ul>
            {Object.keys(props.items)
                .reduce((items, key) => {
                    return [...items, props.items[key]];
                }, [])
                .map((item, index) => {
                    return { ...item, index };
                })
                .filter(item => {
                    return matchFields(item.fields, props.searchQueryFields);
                })
                .map(item => {
                    return <div key={item.id}>...</div>;
                })}
        </ul>
    );
}

// After:
function convertToItemsArray(items) {
    return Object.keys(items)
        .reduce((arr, key) => {
            return [...arr, items[key]];
        }, [])
        .map((item, index) => {
            return { ...item, index };
        });
}

function filterItems(items, searchQueryFields) {
    return items.filter(item => {
        return matchFields(item.fields, searchQueryFields);
    });
}

function MyComponent(props) {
    let items = convertToItemsArray(props.items);
    let filteredItems = filterItems(items, props.searchQueryFields);
    return (
        <ul>
            {filteredItems.map(item => {
                return <div key={item.id}>...</div>;
            })}
        </ul>
    );
}
```

> **Note:** Be sure not to pull any of the JSX into these helper functions. As a
> general rule: If you're writing JSX in a separate function that isn't a
> component (or inside a class component's `render()` method), you're probably
> doing something "weird".

## Aftermath

After this refactoring was presented, we decided to change our original rule to
be more relaxed and allow for this style of refactoring.
