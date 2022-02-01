# smooth-release
Smart CLI utility to **safely** and **automatically** do every step to release a new version of a library hosted on `GitHub` and published on `npm`.

## Install
`npm i -g smooth-release`

## Usage
Simply run `smooth-release` from your root folder, that's all :)

#### Custom settings
- Every config value used by `smooth-release` is overridable: jump to [`.smooth-releaserc`](https://github.com/buildo/smooth-release#smooth-releaserc) section to know more about it.
- You can run or turn off specific tasks also by passing a set of CLI arguments: jump to [`CLI arguments`](https://github.com/buildo/smooth-release#cli-arguments) section to know more about it.


## What it does
`smooth-release` does five main activities in this order:

1. Run validations
2. Increase version and push new commit and tag
3. Generate CHANGELOG.md
4. Create release on GitHub with link to relative section in CHANGELOG.md
5. Publish on `npm`

### Run validations
In order to proceed each one of these validations must pass (they can be optionally turned off):

1. Current branch must be the one defined in `.smooth-releaserc` (default: "master")
2. Local branch must be in sync with remote
3. No uncommited changes in the working tree
4. No untracked filed in the working tree
5. User must be logged in "npm" and have write permissions for current package

### Increase version


#### Check if version should be considered "breaking" or not
`smooth-release` automatically detects if the next version should be "breaking" or not.
If a version is "breaking" it will be a `major` otherwise it will be a `patch`.
`smooth-release` never creates a `minor` version.

To decide if a version is "breaking", `smooth-release` analyzes every *closed issue* (or *merged pull request*) from GitHub: if there is **at least** one *valid* closed issue marked as "breaking" the version will be breaking.

To mark an *issue* (or *pull request*) as "breaking" you can add to it a label named as you like. This label should also be added to `smooth-releaserc` to let `smooth-release` know about it.

NOTE: you can use *pull requests* instead of *issues* by setting `github.dataType` in `.smooth-releaserc` to `"pullRequests"`

**MANUAL OVERRIDE:**
If you need to, you can override this step by manually passing the desired version/increase level as argument to `smooth-release`:

```
smooth-release minor
smooth-release pre-major
smooth-release 5.4.6
```

#### npm version and push
Runs:

1. `npm version ${newVersion} --no-git-tag-version`

### Generate CHANGELOG.md
The script to generate the changelog is basically a replica in JavaScript of [github-changelog-generator](https://github.com/skywinder/github-changelog-generator).

The changelog is generated using *closed issues* by default. You can use *merged pull requests* instead by setting `github.dataType` in `.smooth-releaserc` to `"pullRequests"`

This script is stateless: every time it runs it replaces CHANGELOG.md with a new one.

You can see an example by looking at the CHANGELOG.md file on this repo: https://github.com/buildo/smooth-release/blob/master/CHANGELOG.md.

### Create release on GitHub with link to CHANGELOG.md section
It statelessly creates a GitHub release for the last npm-version tag.

`smooth-release` defines an *npm-version tag* as a tag named `v1.2.3` where `1`, `2`, `3` can be any number.

The release is named after the tag (ex: v1.2.3) and the body contains a link to the relative section in CHANGELOG.md.

You can see an example by looking at any release from this repo: https://github.com/buildo/smooth-release/releases.

### Create release commit and push it on origin
This step is run only if there are changes to commit. This may happen if you run one of these scripts:
- npm-version (modifies `package.json`)
- changelog (modifies `CHANGELOG.md`)

If the only file that changed is `CHANGELOG.md` the new commit will have as message `"Update CHANGELOG.md"`.

Otherwise, if you run also `npm-version` script and therefore the `package.json` has been updated, the new commit will have the standard version message (`"1.2.3"`) and will also have the npm-version tag (`v.1.2.3`).


### Publish on `npm`
Runs:

1. `npm publish`

## `.smooth-releaserc`
`smooth-release` comes with a safe default for each config value. This is the `defaultConfig` JSON used by `smooth-release`:

```js
{
  github: {
    dataType: 'issues',
    changelog: {
      outputPath: './CHANGELOG.md',
      ignoredLabels: ['DX', 'invalid', 'discussion'],
      bug: {
        title: '#### Fixes (bugs & defects):',
        labels: ['bug', 'defect']
      },
      breaking: {
        title: '#### Breaking:',
        labels: ['breaking']
      },
      feature: {
        title: '#### New features:'
      }
    }
  },
  publish: {
    branch: 'master',
    inSyncWithRemote: true,
    noUncommittedChanges: true,
    noUntrackedFiles: true,
    validNpmCredentials: true,
    validGithubToken: true,
    packageFilesFilter: 'files',
    npmVersionConfirmation: true
  },
  tasks: {
    validations: true,
    'npm-publish': null,
    'npm-version': null,
    'gh-release': null,
    'gh-release-all': false,
    changelog: null
  }
}
```

If you set a task to `null`, `smooth-release` will prompt you every time before running the task:
![image](https://cloud.githubusercontent.com/assets/4029499/21606902/e78f23d0-d1b2-11e6-9c17-b4bccf853856.png)

If you want to change parts of the default config you can define a JSON file in the root directory of your project named `.smooth-releaserc`.

The file will be recursively merged into `defaultConfig` (NB: arrays are replaced, not merged!).


## CLI arguments
`smooth-release` can be configured using CLI arguments as well.

The main argument is passed directly to the `npm-version` task so you can use `smooth-release` like `npm version`:
```bash
smooth-release minor
```

You can also override the default behavior of each task by passing it as argument:

Examples
```bash
smooth-release --no-npm-publish # safely run "smooth-release" without publishing on "npm"
smooth-release --changelog --gh-release-all # first time using smooth-release on your repo? this way you add a CHANGELOG.md and a GitHub release for every npm verison tag :)
```

If you specify one ore more negative argument, interactive prompts will be displayed for the remaining arguments (ex: `--no-changelog`).

If you specify one or more positive argument, all interactive prompts will be disabled and only the whitelisted tasks will be run (ex: `--changelog`).
