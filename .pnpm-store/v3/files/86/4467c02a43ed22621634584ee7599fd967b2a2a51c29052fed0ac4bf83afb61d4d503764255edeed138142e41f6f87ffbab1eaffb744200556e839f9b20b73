"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable no-param-reassign, no-use-before-define */


var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./ensureDevPropTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const mutatePropType = (name, object = _propTypes2.default[name]) => {
  object.type = _extends({}, object.type, { name });
  if (object.isRequired) {
    object.isRequired.required = true;
    Object.keys(object).filter(key => !["isRequired"].includes(key)).forEach(key => {
      object.isRequired[key] = object[key];
    });
    mutatePropType(name, object.isRequired);
  }
};

const mutatePropTypeFn = name => {
  const original = _propTypes2.default[name];
  _propTypes2.default[name] = arg => {
    const object = original(arg);
    if (typeof arg === "function" && arg.name.indexOf("checkType") >= 0) {
      // arrayOf
      object.type = { value: parsePropTypeMethod(arg).type };
    } else if (typeof arg === "function") {
      // instanceOf
      object.type = { value: arg.name };
    } else if (Array.isArray(arg) && typeof arg[0] === "function") {
      // oneOfType
      object.type = {
        value: arg.map(method => parsePropTypeMethod(method).type)
      };
    } else if (!Array.isArray(arg) && typeof arg === "object") {
      // shape
      object.type = { value: parsePropTypes({ propTypes: arg }) };
    } else {
      // oneOf
      object.type = { value: arg };
    }
    mutatePropType(name, object);
    return object;
  };
};

Object.keys(_propTypes2.default).filter(type => !["exact", "checkPropTypes", "PropTypes"].includes(type)).forEach(type => {
  if (_propTypes2.default[type].isRequired) {
    return mutatePropType(type);
  }
  return mutatePropTypeFn(type);
});

const parsePropTypeMethod = (_ref, value) => {
  let isRequired = _ref.isRequired,
      method = _objectWithoutProperties(_ref, ["isRequired"]);

  return _extends({
    type: {
      name: "custom"
    },
    required: false
  }, typeof value !== "undefined" ? { defaultValue: { value } } : {}, method);
};

/** */
const parsePropTypes = ({
  propTypes = {},
  defaultProps = {}
}) => Object.keys(propTypes).reduce((parsed, prop) => _extends({}, parsed, {
  [prop]: parsePropTypeMethod(propTypes[prop], defaultProps[prop])
}), {});

exports.default = parsePropTypes;