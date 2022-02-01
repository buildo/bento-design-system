'use strict';

const lessToJs = require('less-vars-to-js');
const camelcase = require('camelcase');
const loaderUtils = require('loader-utils');
const entries = require('object.entries');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const camelCaseKeys = !!(query.camelCase || query.camelcase);
  const resolveVariables = !!(query.resolveVariables || query.resolvevariables);

  const varRgx = /^@/;
  const vars = lessToJs(source);
  const keys = Object.keys(vars);
  if (!keys.length) {
    this.emitWarning('Could not find any extractable less variables!');
  }

  if (resolveVariables) {
      const followVar = (value) => {
        if (varRgx.test(value)) {
          // value is a variable
          return followVar(vars[value]);
        }
        return value;
      }
      entries(vars).map((entry) => {
        const key = entry[0];
        const value = entry[1];
        vars[key] = followVar(value);
      });
  }

  const transformKey = (key) => {
      let ret = key.replace(varRgx, '');
      if (camelCaseKeys) {
        ret = camelcase(ret);
      }
      return ret;
  }

  const cleanedVars = keys.reduce((prev, key) => {
    prev[transformKey(key)] = vars[key];
    return prev;
  }, {});

  return `module.exports = ${JSON.stringify(cleanedVars, true, 2)};\n`;
};
