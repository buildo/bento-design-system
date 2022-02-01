"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withThemes = void 0;

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = require("./constants");

var _parameters = _interopRequireDefault(require("./parameters"));

var _shared = require("./shared");

var _vue = require("./decorators/vue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function wrapper(getStory, context, _ref) {
  var parameters = _ref.parameters;
  var config = (0, _shared.getConfig)(parameters);

  var channel = _addons["default"].getChannel();

  channel.emit(_constants.DECORATOR);
  return {
    components: {
      ThemeDecorator: _vue.ThemeDecorator
    },
    template: "\n<theme-decorator :config=\"config\">\n  <story/>\n</theme-decorator>",
    data: function data() {
      return {
        config: config
      };
    }
  };
}

var withThemes = (0, _addons.makeDecorator)(Object.assign({}, _parameters["default"], {
  wrapper: wrapper
}));
exports.withThemes = withThemes;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}