# current-git-branch

[![Build Status](https://travis-ci.org/JPeer264/node-current-git-branch.svg?branch=master)](https://travis-ci.org/JPeer264/node-current-git-branch)
[![Build status](https://ci.appveyor.com/api/projects/status/ehj6762gbj1e2qyc?svg=true)](https://ci.appveyor.com/project/JPeer264/node-current-git-branch)
[![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-current-git-branch/badge.svg?branch=master)](https://coveralls.io/github/JPeer264/node-current-git-branch?branch=master)

Get synchronously the current branch name

## Installation

```sh
$ npm i current-git-branch --save
```
or
```sh
$ yarn add current-git-branch
```

## Usage

Returns:
- Boolean `false`: It is not a git repository
- String: The branch name

```js
const branchName = require('current-git-branch');

branchName(); // false or branch name of process.cwd()
branchName({ altPath: 'any/git/repo' }); // false or branch name of the directory 'any/git/repo'
branchName({ altPath: 'any/git/repo', branchOptions: [ "--no-color" ] }); // alternatively, you may pass git-branch command options, either as a string or an array
```

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)
