"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeDecorator = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = require("../constants");

var _shared = require("../shared");

var _shared2 = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var channel = _addons["default"].getChannel();

var ThemeDecorator = {
  beforeDestroy: function beforeDestroy() {
    channel.removeListener(_constants.CHANGE, this.setThemeName);
  },
  computed: {
    theme: function theme() {
      return (0, _shared.getSelectedTheme)(this.config.list, this.themeName);
    },
    themeClasses: function themeClasses() {
      return (0, _shared2.getHtmlClasses)(this.theme);
    }
  },
  data: function data() {
    var lastValue = channel.last(_constants.CHANGE);
    return {
      themeName: lastValue && lastValue[0] || (0, _shared.getSelectedThemeName)(this.config.list, this.config["default"])
    };
  },
  methods: {
    setThemeName: function setThemeName(themeName) {
      this.themeName = themeName;
    }
  },
  mounted: function mounted() {
    var channel = _addons["default"].getChannel();

    channel.on(_constants.CHANGE, this.setThemeName);
  },
  props: ['config'],
  template: "\n<component\n  v-if=\"this.config.Decorator\"\n  :is=\"this.config.Decorator\"\n  :theme=\"theme\"\n  :themes=\"this.config.list\"\n  :themeClasses=\"themeClasses\"\n  :themeName=\"themeName\"\n>\n  <slot></slot>\n</component>\n<div v-else :class=\"themeClasses\">\n  <slot></slot>\n</div>"
};
exports.ThemeDecorator = ThemeDecorator;