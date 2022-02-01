import { homedir } from 'os';
import test from 'ava';

import isGit from './index';

const isGitRequire = require('./');

test('check if process.cwd() is a git repo', (t) => {
  t.true(isGit());
  t.true(isGitRequire());
});

test('check if another dir is a git repo', (t) => {
  t.false(isGit(homedir()));
  t.false(isGitRequire(homedir()));
});
