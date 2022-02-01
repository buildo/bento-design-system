import fs from 'fs';
import { homedir } from 'os';
import test from 'ava';
import path from 'path';

import branchName from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

const folders = [
  'feat_test',
  'master',
];

test.before('rename git folders', () => {
  folders.map(folder => fs.renameSync(path.join(fixtures, folder, 'git'), path.join(fixtures, folder, '.git')));
});

test.after.always('rename .git folders', () => {
  folders.map(folder => fs.renameSync(path.join(fixtures, folder, '.git'), path.join(fixtures, folder, 'git')));
});

test('check if the given directory is the branch master', (t) => {
  t.is(branchName({ altPath: path.join(fixtures, 'master'), branchOptions: '--no-color' }), 'master');
});

test('check if the given directory is the branch feat/test', (t) => {
  t.is(branchName({ altPath: path.join(fixtures, 'feat_test'), branchOptions: '--no-color' }), 'feat_test');
});

test('check the branch name of the home dir', (t) => {
  t.false(branchName({ altPath: homedir(), branchOptions: '--no-color' }));
});
