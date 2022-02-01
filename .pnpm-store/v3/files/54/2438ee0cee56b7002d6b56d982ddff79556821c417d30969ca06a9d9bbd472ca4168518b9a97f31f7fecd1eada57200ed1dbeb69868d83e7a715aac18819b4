"use strict";

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;

const isValidElement = object => typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;

const devPropTypes = require("prop-types/factoryWithTypeCheckers")(isValidElement, true);

Object.keys(_propTypes2.default).forEach(key => {
  _propTypes2.default[key] = devPropTypes[key];
});