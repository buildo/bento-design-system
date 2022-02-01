# StaggerJS

Very light utility to stagger a list of async methods.

## Install

```
npm i --save staggerjs
```

## Usage

```js
import stagger from 'staggerjs';

// asyncMethods is an array of functions that return a Promise

stagger(asyncMethods, { maxOngoingMethods: 10, perSecond: 30 });
```

Given a set of async methods, with `staggerjs` you can easily enforce a maximum number of ongoing methods (`maxOngoingMethods`) and also apply a throttle (`perSecond`).
