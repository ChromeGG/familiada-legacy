# Familiada

App inspired by Familiada - the Polish version of Family Feud.

## Running application

```bash
npm install
npm run prepare
npm run dev
```

## Adding capabilities to your workspace

This project was generated using [Nx](https://nx.dev).

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Test

To run test

```bash
npx nx test <project> --test-file <pattern>
# e.x.
npx nx test backend --test-file games.ser
```

## Generate an application

Run `npx nx g @nrwl/react:app my-app` to generate an application (like `Backend` or `Frontend`).

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `npx nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@familiada/mylib`.

## Development server

Run `npx nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `npx nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `npx nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running type-check

```bash
npx tsc -p apps/<appName>/tsconfig.json --noEmit --incremental
# e.g.
# npx tsc -p apps/frontend/tsconfig.json --noEmit --incremental

```

## Running unit tests

Run `npx nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `npx nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npx nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npx nx dep-graph` to see a diagram of the dependencies of your projects.
