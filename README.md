# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `api`: a [Next.js](https://nextjs.org/) app
- `frontend`: a [Nest.js](https://nestjs.com/) app
- `@typesaas/env`: environments variables package
- `@typesaas/typescript-config`: commom configuration for typescript
- `@typesaas/schemas`: shared schemas for both apps
- `@typesaas/prisma`: prisma adapter, types and schemas for databases
- `@typesaas/transactional`: nodemailer and templates to send emails

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/) for code linting and formatting

### Build

To build all apps and packages, run the following command:

```
cd typesaas
npm run  build
```

### Develop

To develop all apps and packages, run the following command:

```
cd typesaas
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
