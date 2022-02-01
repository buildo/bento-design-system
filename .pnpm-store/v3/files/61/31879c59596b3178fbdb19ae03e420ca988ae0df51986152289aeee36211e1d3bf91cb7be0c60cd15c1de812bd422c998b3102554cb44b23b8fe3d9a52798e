"use strict";

require("core-js/modules/es.array.join");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHtmlClasses = getHtmlClasses;

function getHtmlClasses(theme) {
  return theme && theme["class"] ? theme["class"] instanceof Array ? theme["class"].join(' ') : theme["class"] : '';
}