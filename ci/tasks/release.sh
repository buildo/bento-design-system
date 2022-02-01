#!/bin/sh

set -e

LATEST_TAG=$(git describe --tags)
VERSION=${LATEST_TAG#v}

mkdir -p $HOME/.ssh
ssh-keyscan github.com >> $HOME/.ssh/known_hosts
echo "$SSH_PRIVATE_KEY" > $HOME/.ssh/id_rsa
chmod 400 $HOME/.ssh/id_rsa

git config --global user.email "nemobot@buildo.io"
git config --global user.name "Nemobot"

corepack enable

pnpm install --no-progress
pnpm version --no-git-tag-version --new-version $VERSION

git add .
git commit -m "v$VERSION"
git push origin HEAD:main

echo "//registry.yarnpkg.com/:_authToken=$NPM_TOKEN" >> $HOME/.npmrc
pnpm publish --non-interactive
