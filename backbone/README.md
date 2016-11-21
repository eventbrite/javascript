# Eventbrite Backbone & Marionette Coding Style Guide

Eventbrite's [Backbone.js](backbonejs.org) and [Marionette.js](marionettejs.com) guidelines to ensure consistency in JavaScript code.

Backbone and Marionette come with a rich API and also functions provided by [underscore](http://underscorejs.org/) (`_`) and [jquery]((http://api.jquery.com/category/version/1.7/)) (`$`). Although good and fast to use, these utilities can be hard to navigate or even challenging when building large-scale applications. Many times midway through development, we find that were used the tools incorrectly and have to change course, resulting in Frankenstein code. This guide will attempt to ease some of these problems.

Backbone and Marionette come with rich APIs as well as functions provided by [underscore](http://underscorejs.org/) (`_`) and [jquery]((http://api.jquery.com/category/version/1.7/)) (`$`). Although good and fast to use, these utilities can be hard to navigate or even challenging when building large-scale applications. Many times, we have found midway through development that we had used the tools incorrectly and must change course, resulting in Frankenstein code. This guide aims to ease some of these problems.

## Table of Contents

0. [Backbone.js](#backbonejs)
0. [Marionette.js](#marionettejs)
0. [Additional plugins](#additional-plugins)
0. [Common terminology](#common-terminology)
0. [File structure](#file-structure)
0. [Ordering](#ordering)
0. [Statics](#statics)
0. [Styling](#styling)
0. [Context](#context)
0. [Function](#good-practices-functions)
0. [Hydrating apps](#good-practices-hydrating-apps)
0. [Marionette.Layout](#marionette-layout)
0. [Marionette.Views](#marionette-views)
0. [Backbone.Model](#backbonemodel)
0. [Backbone.Collection](#marionette-collection)
0. [Marionette Artifacts Life Cycle](#marionette-artifacts-life-cycle)
0. [Backbone Life Cycle](#)
0. [Architecting JS Apps at Eventbrite](#architecting-js-apps-at-eventbrite)
0. [Debugging common issues](#debugging-common-issues)
0. [Testable Modular JS with Backbone, Jasmine & Sinon](#testable-modular-js-with-backbone-jasmine--sinon)


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

## Folder Structure

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

`feature\_name.js` contains the code to initialize your module.

Each model, each view, and the router gets its own file mirroring its JavaScript naming. For example, `EB.ProjectName.FirstModel` is in `eb/feature_name/first_model.js`.

## File structure

A reference to `Marionette` can actually be retrieved from a reference to `Backbone`. However, we recommend requiring `Marionette` separately, so that if we try to simplify our stack, we don't have to change a considerable amount of code to remove the `Backbone` dependency/namespace:

```js
// good
var Marionette = require('marionette');

return Marionette.ItemView.extend({ /* do something here */ });

// bad (access Marionette from Backbone)
var Backbone = require('backbone');

return Backbone.Marionette.ItemView.extend({ /* do something here */ });
```

**[⬆ back to top](#table-of-contents)**

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

## Ordering

  - **Outside** `Marionette.View` definition

  0. `dependencies` requirement
  0. `static` functions
  0. `config` objects

  - Ordering for `Marionette.View`:

  0. `el`
  0. `template`
  0. `tagName`
  0. `itemView` *Composite View*
  0. `itemViewContainer` *Composite View*
  0. `className`
  0. `ui`
  0. `regions` *Layout*
  0. `events`
  0. `triggers`
  0. `modelEvents`
  0. `initialize`
  0. `templateHelpers`
  0. `onBeforeRender`
  0. `render`
  0. `onRender`
  0. *all the remaining life cycle methods*
  0. *clickHandlers or eventHandlers*
  0. *getter methods*

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

Don't store derived/calculated data on the `this` context of a view. Doing so makes it fragile and error-prone, because nothing prevents that data from being modified. Furthermore, it complicates quality code review (AKA static analysis) because the reviewer must first investigate the origin of the instance property.

Whenever possible, calculate the data on demand, either in the model or in the view:

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
