# Bento project templates

This directory contains project templates that can be used to bootstrap new projects using Bento.

## How to use a template

```bash
pnpx degit buildo/bento-design-system/templates/<template-name> [my-new-project]
```

Omitting the project name will clone the template in the current directory.

## Available templates

- [react-router-monorepo](./react-router-monorepo/README.md): sets up a monorepo using pnpm and Nx. The monorepo contains an app and a design system library. The app uses React Router v7 (with SSR enabled) and it comes with i18n pre-configured.

  ```bash
  pnpx degit buildo/bento-design-system/templates/react-router-monorepo my-new-project
  ```
