# Eventbrite Backbone & Marionette Coding Style Guide

Guidelines used by Eventbrite to provide consistency and prevent errors in JavaScript code written for [Backbone.js](backbonejs.org) and [Marionette.js](marionettejs.com).

Backbone and Marionette come with a rich API and also functions provided by [underscore](http://underscorejs.org/) (`_`) and [jquery]((http://api.jquery.com/category/version/1.7/)) (`$`). Although good and fast to use, these utilities can be hard to navigate or even challenging when building large-scale applications. Many times midway through development, we find that were used the tools incorrectly and have to change course, resulting in Frankenstein code. This guide will attempt to ease some of these problems.

## Table of Contents

0. [Backbone.js](#backbonejs)
0. [Marionette.js](#marionettejs)
0. [Additional plugins](#additional-plugins)
0. [Common terminology](#common-terminology)
0. [File structure](#file-structure)
0. [Statics](#statics)
0. [Styling](#styling)
0. [Context](#context)
0. [Function](#good-practices-functions)
0. [Hydrating apps](#good-practices-hydrating-apps)
	0. [Static or on Bootstrap](#good-practices-static-hydration)
	0. [dynamic](#good-practices-dynamic-hydration-apps)
0. [Marionette.Layout](#marionette-layout)
	0. [Regions](#marionette-regions)
0. [Marionette.Views](#marionette-views)
0. [Backbone.Model](#backbonemodel)
	0. 	[Handling errors](#handling-errors-on-models)
0. [Backbone.Collection](#marionette-collection)
	0. [Handling errors](#handling-errors-on-collections)
0. [Marionette Artifacts Life Cycle](#marionette-artifacts-life-cycle)
0. [Backbone Life Cycle](#)
0. [Architecting JS Apps at Eventbrite](#architecting-js-apps-at-eventbrite)
	0. [app.js](#app.js)
	0. [Templates](#templates)
	0. [File structure](#file-structure)
	0. [File name conventions](#file-name-conventions)
	0. [Eb Flux](#eb-flux-architecture)
		0. [Stores](#eb-flux-stores)
		0. [Views](#eb-flux-views)
		0. [Actions](#eb-flux-actions)
0. [Debugging common issues](#debugging-common-issues)
0. [Testable Modular JS with Backbone, Jasmine & Sinon](#testable-modular-js-with-backbone-jasmine-sinon)


## Backbone.js

From the [Backbone.js](http://backbonejs.org/) docs:

> Backbone.js gives structure to web applications by providing **models** with key-value binding and custom events, **collections** with a rich API of enumerable functions, **views** with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.

Eventbrite still uses v1.0.0 of Backbone. For more, see [Getting started with Backbone.js](http://backbonejs.org/#Getting-started).

_NOTE:_ [`Backbone.View`](http://backbonejs.org/#View) is deprecated in favor of using [Marionette views](#marionette-views).

**[⬆ back to top](#table-of-contents)**

## Marionette.js

From the [Marionette.js](http://marionettejs.com/) docs:

> Marionette simplifies your Backbone application code with robust views and architecture solutions.

Eventbrite still uses v1.8.8 of Marionette.ItemView. For more, see [Marionette v1.8.8 docs](http://marionettejs.com/docs/v1.8.8/).

_NOTE:_ [`Marionette.Application.module`](http://marionettejs.com/docs/v1.8.8/marionette.application.module.html) is deprecated in favor of [`Marionette.Layout`](http://marionettejs.com/docs/v1.8.8/marionette.layout.html). You will still see it used in certain parts of the product, such as in **Listings** or **My Contacts**.

_NOTE:_ [`Marionette.Controller`](http://marionettejs.com/docs/v1.8.8/marionette.controller.html) is deprecated in favor of [`Marionette.Layout`](http://marionettejs.com/docs/v1.8.8/marionette.layout.html). [`Marionette.Object`](http://marionettejs.com/docs/v2.1.0/marionette.object.html) is also available. It was taken from a later version of Marionette and stitched in.

**[⬆ back to top](#table-of-contents)**

## Additional plugins

We have a couple of plugins/libraries to enhance and simplify our use of Backbone/Marionette:

- [`Backbone.Advice`](https://github.com/rhysbrettbowen/Backbone.Advice): Adds functional mixin abilities for Backbone objects
- [`dorsal`](https://github.com/eventbrite/dorsal): An HTML decorator library
- [`Backbone.Stickit`](https://github.com/NYTimes/backbone.stickit): Backbone data binding plugin that binds Model attributes to View elements
- [`Backbone.Validation`](https://github.com/thedersen/backbone.validation): A validation plugin for Backbone that validates both your model as well as form input
- [`Backbone.Wreqr`](https://github.com/marionettejs/backbone.wreqr): Messaging patterns for Backbone applications

**[⬆ back to top](#table-of-contents)**

## Common terminology

- _context_ -
- _hydrating_ -
- _bootstrap_ -
- _module_ -
- _component_ -
- _app_ -
- _parameters_ -
- _argument_ -
- _config_ -
- _artifact_ -
- _helpers_ -
- _mixins_ -
- _base bundle_ -
- _bundle_ -

**[⬆ back to top](#table-of-contents)**

## File structure

A reference to `Marionette` can actually be retrieved from a reference to `Backbone`. However, we recommend requiring `Marionette` separately so that if we try to simply our stack, we don't have to change a considerable amount of code to remove the `Backbone` dependency/namespace:

```js
// good
var Marionette = require('marionette');

return Marionette.ItemView.extend({ /* do something here */ });

// bad (access Marionette from Backbone)
var Backbone = require('backbone');

return Backbone.Marionette.ItemView.extend({ /* do something here */ });
```

Whenever possible, return only one [artifact](#common-terminology) per file:

```js
// good

//view_a.js

var Marionette = require('marionette');

return Marionette.ItemView.extend({ /* do something here */ });

//view_b.js

var Marionette = require('marionette');

return Marionette.ItemView.extend({ /* do something here */ });


// bad (returning multiple artifacts in one file)

var Marionette = require('marionette'),
	ViewA = Marionette.ItemView.extend({ /* do something here */ }),
	ViewB = Marionette.ItemView.extend({ /* do something here */ });

return {ViewA: ViewA, ViewB: ViewB};
```

Whenever possible, return the artifact immediately instead of assigning to a variable that just gets returned afterward:

```js
// good
var Marionette = require('marionette');

return Marionette.ItemView.extend({ /* do something here */ });

// bad (assigns the ItemView to a variable unnecessarily)
var Marionette = require('marionette'),
	MyItemView;

MyItemView = Marionette.ItemView.extend({ /* do something here */ });

return MyItemView;
```

**[⬆ back to top](#table-of-contents)**

## Statics

When we write views or models/collections, we tend to enclose all of our functions as methods on the artifact. However, sometimes these methods are really just static helpers that don't need context (i.e. not bound to `this`). In this case, it's better to extract out the function as a private helper, which also simplifies the API exposed by the artifact:

```js
// good
var Marionette = require('marionette');

function extractAttributes(options) {
	var attrs = {};
	// do stuff
	return attrs;
};

return Marionette.ItemView.extend({
	initialize: function(options) {
		var attrs = extractAttributes(options);

		this.model = new Backbone.Model(attrs);
	};
});

// bad (extractAttributes is an additional method on the view unnecessarily)
var Marionette = require('marionette');

return Marionette.ItemView.extend({
	initialize: function(options) {
		var attrs = this.exractAttributes(options);

		this.model = new Backbone.Model(attrs);
	},
	extracAttributes: function(options) {
		var attrs = {};
		// do stuff
		return attrs;
	}
});
```

Oftentimes an artifact needs some static/constant data that never need to change. Instead of having magic numbers/strings in the code, or having a configuration object attached to each instance, we should store the configuration information in a const object variable:

```js
// good
var $ = require('jquery'),
	Marionette = require('marionette'),
	config = {
		selectorName: 'someDynamicSelector',
		isHiddenClass: 'is-hidden',
		timeout: 10
	};

return Marionette.ItemView.extend({
	initialize: function(options) {
		$(config.selectorName).add(config.isHiddenClass);
		window.setTimeout(this.someCallback, config.timeout);
	}
});

// ok (config objects exists as a property for each view instance)
var $ = require('jquery'),
	Marionette = require('marionette');

return Marionette.ItemView.extend({
	config: {
		selectorName: 'someDynamicSelector',
		isHiddenClass: 'is-hidden',
		timeout: 10
	},
	initialize: function(options) {
		$(this.config.selectorName).addClass(this.config.isHiddenClass);
		window.setTimeout(this.someCallback, this.config.timeout);
	}
});

// bad (uses magic numbers/strings)
var $ = require('jquery'),
	Marionette = require('marionette');

return Marionette.ItemView.extend({
	initialize: function(options) {
		$('someDynamicSelector').addClass('is-hidden');
		window.setTimeout(this.someCallback, 10);
	}
});
```

**[⬆ back to top](#table-of-contents)**

## Styling

To simplify searches when trying to find templates, put CSS classes in handlebars templates instead of coupling it with the view logic:

```js
// good

// some_view.handlebars

<div class="g-cell g-cell-12-12"></div>

// some_view.js

var Marionette = require('marionette'),
	template = require('hb!./some_view.handlebars');

return Marionette.ItemView({
	template: template
});


// bad (CSS classes aren't separated out)
var Marionette = require('marionette');

return Marionette.ItemView({
	className: 'g-cell g-cell-12-12'
});
```

**[⬆ back to top](#table-of-contents)**

## Context

### Binding

In order to use native JavaScript whenever possible, use [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) instead of [`_.bind`](http://underscorejs.org/#bind) and [`_.bindAll`](http://underscorejs.org/#bindAll) to bind callback handlers:

```js
// good
return Marionette.ItemView.extend({
	initialize: function(options) {
		this.listenTo(channel.vent, 'someSignal', this.someMethod.bind(this));
		this.listenTo(channel.vent, 'anotherSingle', this.anotherMethod.bind(this));
	},

	someMethod: function(options) {
		/* do something */
	},
	anotherMethod: function(options) {
		/* do something */
	}
});

// bad (uses _.bindAll)
return Marionette.ItemView.extend({
	initialize: function(options) {
		_.bindAll(this, 'someMethod', 'anotherMethod');

		this.listenTo(channel.vent, 'someSignal', this.someMethod);
		this.listenTo(channel.vent, 'anotherSingle', this.anotherMethod);
	},

	someMethod: function(options) {
		/* do something */
	},
	anotherMethod: function(options) {
		/* do something */
	}
});

// bad (uses _.bind)
return Marionette.ItemView.extend({
	initialize: function(options) {
		this.listenTo(channel.vent, 'someSignal', _.bind(this.someMethod));
		this.listenTo(channel.vent, 'anotherSingle', _.bind(this.anotherMethod));
	},

	someMethod: function(options) {
		/* do something */
	},
	anotherMethod: function(options) {
		/* do something */
	}
});
```

**[⬆ back to top](#table-of-contents)**

### Data

Storing derived/calculated data on the `this` context of a view can be fragile and error prone because nothing prevents that data from being modified. Furthermore, it makes quality code review (aka static analysis) more challenging as the reviewer needs to first investigate where the instance property originates.

Whenever possible, calculate the data on demand either in the model or in the view:

```js
// good
return Marionette.ItemView.extend({
	getComputedData: function() {
		return this.model.getComputedData();
	}
});

// ok (the View is doing data calculations that could be done by Model)
return Marionette.ItemView.extend({
	getComputedData: function() {
		return someDataTransformation(this.options);
	}
});

// bad (storing computed data in the View context)
return Marionette.ItemView.extend({
	initialize: function(options) {
		this.computedData = someTransformation(options);
	}

	getComputedData: function() {
		return this.computedData;
	}
});
```

**[⬆ back to top](#table-of-contents)**

## Testable Modular JS with Backbone, Jasmine & Sinon

### Reading

-   Jasmine documentation <http://jasmine.github.io/1.3/introduction.html>
-   Sinon Documentation <http://sinonjs.org/docs/>
-   Backbone.js documentation <http://backbonejs.org>
-   Testing Backbone applications with Jasmine and Sinon <http://tinnedfruit.com/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html>
-   Dan North’s original BDD article: <http://dannorth.net/introducing-bdd/>
-   BDD Wikipedia Page: <http://en.wikipedia.org/wiki/Behavior-driven_development>
-   Overview of the state of JavaScript MVC frameworks, a little scattered, but useful <http://coding.smashingmagazine.com/2012/07/27/journey-through-the-javascript-mvc-jungle/>
-   Overview of ‘use strict’ <http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/>

### Examples in our code

    - Backbone code: django/media/django/js/src/require/components/list_selection_builder/*
    - Jasmine specs: django/media/django/js/src/require/components/list_selection_builder/list_selection_builder_layout.spec.js

### The importance of red/green/refactor:

-   Red: you write a failing spec before you write the associated code, run the spec and watch it fail with red.
-   Green: write the code to make the spec pass, see the green for a passing test.
-   Refactor: now you can refactor it to make the code better as neccessary

The main benefit here is that you end up writing testable code, which is especailly important for JavaScript as trying to add tests later you’ll find that your code is usually not decoupled enough.

Also, this means that all features have associated test cases, which is important as we strive to ship quality code.

And because you fail the test first, you have more confidence when it turns green that you are testing what you think you are testing. All too often a test will pass, but you aren’t testing the correct behaviour.

#### Benefits

-   If you follow red/green/refactor you end up with loosely-coupled, testable code.
-   The tests cases are readable in english, so the failure messages give you a very good idea of what actually failed- Higher code quality.

### Spies, Stubs, Mocks and Fake Servers with Sinon

Sinon is a testing utility that we use with our Jasmine Specs for spies, stubs and mocks. Jasmine has some similar functionality, but we have decided to Sinon’s test utilities instead.

-   Spies are functions that either wrap another function or are standalone anonymous functions that you can assert have been called in some capacity.
-   Stubs are like spies, but they have pre-programmed behaviour and if you wrap an existing function with it, the original function is not called which is often useful.
-   Mocks are a combination of spies and stubs, but you specify the expected behaviour up front.
-   The Fake Server allows us to test AJAX requests without a real server and supplying the different responses to test how the app responds. For the API of the Fake Server, see `fake_server.js`.

I recommend reading the sinon docs for more information. <http://sinonjs.org/docs/>. Here is an example from our code using spies and the fake server:
	
	eb = require('eb');
	fakeServer = require('es6!require/helpers/tests/fake_server');

    it('should trigger an activated event on valid server response', function() {
        var userIsActivatedSpy = sinon.spy();
        this.server = eb.sinon.fakeServer.create();
        this.user.on('activated', userIsActivatedSpy);
        this.user.set('email', 'valid_email@example.com');

        // this would normally trigger an ajax call, but it hits our fake server instead
        this.user.fetch({
            'url': 'get-tickets-account-status'
        });
        // let's return the following response from the fake server
        fakeServer.respondWithSuccess(this.server, {
        	user_exists: true,
            activation_email_sent: false
        });
        // we can assert that our spy was called
        expect(userIsActivatedSpy).toHaveBeenCalledOnce();
        this.server.restore();
    });

We have extended Sinon with a few custom functions, which you can see in django/media/django/js/tests/jasmine/spec/SpecHelper.js

### Running the Jasmine Tests

Go to <https://www.evbdev.com/js-tests> to see the index of the JS unit test suites. Most of the modern unit tests are under require at <https://www.evbdev.com/js-tests/require>.

You can also click through to an individual spec to run just the one, for example <https://www.evbdev.com/js-tests/require/?spec=LSBMainLayout>. The query param comes from the top `describe` block in the test file. This is useful when debugging, as you can run one test suite at a time and put debugger statements in your JS code, run the failing tests and you’ll get a breakpoint there.

We also have all the Jasmine tests running with the Django unit tests via phantomjs (a headless WebKit).

You can run them like so:

    `test_eb ebapps.js_tests.tests`

### Folder Structure

We structure our Backbone projects like so:

    - js/src/require/component/feature_name/
    			    - feature_name.js
    			    - model.js
                            - model.spec.js
                            - view.js
                            - view.spec.js
                            - sub_feature/
                            	- feature_name.js
                            	- model.js
                            	- model.spec.js
                            	- view.js
                            	- view.spec.js
                            - router.js

feature\_name.js contains the code to initialize your module.

Each model, view and the router gets it’s own file mirroring it’s JavaScript naming. eg. EB.ProjectName.FirstModel is in eb/feature\_name/first\_model.js.

**[⬆ back to top](#table-of-contents)**
