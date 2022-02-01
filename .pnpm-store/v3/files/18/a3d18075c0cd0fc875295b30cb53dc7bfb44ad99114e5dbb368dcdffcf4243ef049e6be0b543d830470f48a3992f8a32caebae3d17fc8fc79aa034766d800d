'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _os = require('os');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathIsAbsolute = require('path-is-absolute');

var _pathIsAbsolute2 = _interopRequireDefault(_pathIsAbsolute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

var isGit = function isGit() {
  var altPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cwd;

  var thisPath = (0, _pathIsAbsolute2.default)(altPath) ? altPath : _path2.default.join(cwd, altPath);

  try {
    if ((0, _os.platform)() === 'win32') {
      _execa2.default.shellSync('pushd ' + thisPath + ' & git status');
    } else {
      _execa2.default.shellSync('(cd ' + thisPath + ' ; ([ -d .git ] && echo .git) || git rev-parse --git-dir 2> /dev/null)');
    }

    return true;
  } catch (e) {
    return false;
  }
};

exports.default = isGit;
module.exports = exports['default'];
