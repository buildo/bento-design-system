# less-vars-loader

[![Build status](https://img.shields.io/travis/joscha/less-vars-loader/master.svg)](https://travis-ci.org/joscha/less-vars-loader)
[![npm](https://img.shields.io/npm/v/less-vars-loader.svg)](https://www.npmjs.com/package/less-vars-loader)
![npm](https://img.shields.io/npm/l/less-vars-loader.svg)
![David](https://img.shields.io/david/joscha/less-vars-loader.svg)
![node](https://img.shields.io/node/v/less-vars-loader.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Code Climate](https://img.shields.io/codeclimate/github/joscha/less-vars-loader.svg)](https://codeclimate.com/github/joscha/less-vars-loader)

[webpack](https://webpack.github.io) loader to load variables from [less](http://lesscss.org/) files

## Install

```
npm install --save-dev less-vars-loader
```

## Usage

```less
// some.less
@my-var: 2px;
```

```js
const vars = require("less-vars-loader!./some.less");
// vars == { 'my-var': '2px' }
```

### Camel casing (?camelCase)

The exported keys can be camelCased.
This is disabled by default.

```js
const vars = require("less-vars-loader?camelCase!./some.less");
// vars == { myVar: '2px' }
```

### Resolving variables (?resolveVariables)

For simple `@x = @y` assignments this module can follow the assigned variable replace it with the last assignment.
This is disabled by default.

> Attention: Circular assignments are not supported, neither are non-trivial assignment such as calculations.

```less
// some.less
@a: 1px;
@b: @a;
@c: @b;
```

```js
const vars = require("less-vars-loader?resolveVariables!./some.less");
// vars == { a: '1px', b: '1px', c: '1px' }
```


## TODO

* source map support
