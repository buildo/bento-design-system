"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _constants = require("./constants");

var _manager = require("./manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_addons.addons.register(_constants.ADDON_ID, function (api) {
  _addons.addons.add(_constants.ADDON_ID, {
    title: 'Themes',
    type: _addons.types.TOOL,
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story' || viewMode === 'docs';
    },
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_manager.ThemeSelector, {
        api: api
      });
    }
  });
});