'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _isGitRepository = require('is-git-repository');

var _isGitRepository2 = _interopRequireDefault(_isGitRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();
var defaultOptions = {
  altPath: cwd,
  branchOptions: null
};
var isGitAdded = function isGitAdded() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

  var stdout = void 0;

  if (!(0, _isGitRepository2.default)(options.altPath)) {
    return false;
  }
  var branchOptions = options.branchOptions && Array.isArray(options.branchOptions) ? options.branchOptions.join(' ') : options.branchOptions || '';
  try {
    var cmd = '';

    if ((0, _os.platform)() === 'win32') {
      cmd = 'pushd ' + (options.altPath || cwd) + ' & git branch ' + branchOptions + ' | findstr \\*';
    } else {
      cmd = '(cd ' + (options.altPath || cwd) + ' ; git branch ' + branchOptions + ' | grep \\*)';
    }

    stdout = _execa2.default.shellSync(cmd).stdout;
  } catch (e) {
    return false;
  }

  var branchName = stdout.slice(2, stdout.length);

  return branchName;
};

exports.default = isGitAdded;
module.exports = exports['default'];
