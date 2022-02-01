'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loaderUtils = require('loader-utils');

function virtualResourceLoader() {
  const {
    source
  } = loaderUtils.getOptions(this);
  return Buffer.from(source, 'base64').toString('utf-8');
}

exports.default = virtualResourceLoader;
