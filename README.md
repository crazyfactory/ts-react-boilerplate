# ts-react-boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/crazyfactory/ts-react-boilerplate.svg?token=817c7964cfab1973415f903cc9bde50f4d9ea8d7fe44c1b0e722569f0c99438d)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/crazyfactory/ts-react-boilerplate.svg?branch=master)](https://travis-ci.org/crazyfactory/ts-react-boilerplate)
[![Dependency Status](https://david-dm.org/crazyfactory/ts-react-boilerplate.svg)](https://david-dm.org/crazyfactory/ts-react-boilerplate)
[![devDependency Status](https://david-dm.org/crazyfactory/ts-react-boilerplate/dev-status.svg)](https://david-dm.org/crazyfactory/ts-react-boilerplate?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/crazyfactory/ts-react-boilerplate.svg)](https://github.com/crazyfactory/ts-react-boilerplate/issues)
___

##### Based on [Vortigern](https://github.com/barbar/vortigern)

[![TypeScript](./.github/typescript.png)](https://www.typescriptlang.org/)
[![React](./.github/react.png)](https://github.com/facebook/react)
[![Redux](./.github/redux.png)](https://github.com/reactjs/redux)

## Libraries
This boilerplate uses the following libraries and tools:

#### Core
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://github.com/facebook/react) & [React DOM](https://github.com/facebook/react) for views.
- [Router5](https://github.com/router5) handles in-app routing.
- [Redux](https://github.com/reactjs/redux) manages application state.
- [React Redux](https://github.com/reactjs/react-redux) to use React-Redux bindings.
- [React Router5](https://github.com/router5) & [Redux-Router5](https://github.com/router5) integrate router5 with react
and redux.

#### Utilities
- [Reselect](https://github.com/reduxjs/reselect/) computes derived data, allowing Redux to store the minimal possible
state.
- [Redux Saga](https://github.com/redux-saga/redux-saga) makes side effects (i.e. asynchronous things like data fetching
and impure things like accessing the browser cache) in React/Redux applications easier and better.
- [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) with
[ES6-Promise](https://github.com/stefanpenner/es6-promise) for using fetch api on both client & server side.
- [React Helmet](https://github.com/nfl/react-helmet)
- [Sentry Browser](https://github.com/getsentry/sentry-javascript) captures exceptions during run time.
- [TypeStyle](https://github.com/typestyle/typestyle) makes css typesafe.

#### Build System
- [Webpack](https://github.com/webpack/webpack) for bundling.
  - [TS Loader](https://github.com/TypeStrong/ts-loader) as ts loader.
  - [React Hot Loader](https://github.com/gaearon/react-hot-loader) provides hot reload capability to our development
  server
  - [File Loader](https://github.com/webpack/file-loader)
  - [URL Loader](https://github.com/webpack/url-loader)
  - [Manifest Plugin](https://github.com/danethurber/webpack-manifest-plugin)
  - [TS Lint Loader](https://github.com/wbuchwalter/tslint-loader) for using tslint as preloader on build process.

#### Dev & Prod Server
- [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware)
- [Webpack Hot Middleware](https://github.com/webpack/webpack-hot-middleware)
- [Express](https://github.com/expressjs/express) for running server both on client and server side.
- [Serve Favicon](https://github.com/expressjs/serve-favicon) for serving favicon.

#### Developer Experience
- [ESLint](https://github.com/eslint/eslint) for linting.
- [Typescript ESLint](https://github.com/typescript-eslint/typescript-eslint) enables ESLint to support TypeScript.
- [Redux Logger](https://github.com/theaqua/redux-logger)
- [Redux DevTools](https://github.com/gaearon/redux-devtools)
- [Chalk](https://github.com/chalk/chalk) for colored terminal logs.

#### Testing
- [Jest](https://github.com/facebook/jest) as test runner.
- [TS Jest](https://github.com/kulshekhar/ts-jest) as Jest preprocessor
- [Enzyme](https://github.com/airbnb/enzyme) for rendering React Components.
- [Jest Enzyme](https://github.com/blainekasten/enzyme-matchers) for asserting React Components.

#### Doc
- [Storybook](https://github.com/storybookjs/storybook) - UI component dev & test: React and more.

## Directory Structure
```bash
.
├── build                       # Built, ready to serve app.
├── config                      # Root folder for configurations.
│   ├── types                   # Global type definitions, written by us.
│   ├── utils                   # Utils for config.
│   ├── webpack                 # Webpack configurations.
│   ├── index.js                # Combines main.js and main.local.js
│   ├── main.js                 # Default App configurations.
│   └── main.local.js           # Local App configurations.
├── node_modules                # Node Packages.
├── src                         # Source code.
│   ├── app                     # App folder.
│   │ ├── components            # Unconnected Components.
│   │ ├── constants             # Constants that are used throughout project like Color and FontSize
│   │ ├── containers            # Redux-Connected Components.
│   │ ├── helpers               # Helper Functions.
│   │ ├── images                # Images folder.
│   │ ├── models                # Models folder.
│   │ ├── pages                 # Page-like Components.
│   │ ├── redux                 # Redux related code aka data layer of the app.
│   │ │   ├── middlewares       # Redux middlewares.     
│   │ │   ├── modules           # Redux modules.     
│   │ │   ├── configureStore.ts # Redux store, contains global app state.
│   │ │   ├── IStore.ts         # Store shape.
│   │ │   └── rootReducer.ts    # Main reducers file to combine them.    
│   │ ├── routes                # Routes.
│   │ ├── sagas                 # Saga files.
│   │ └── selectors             # Redux selectors.
│   ├── vendor                  # Dealing with resources
│   ├── client.tsx              # Entry point for client side rendering.
│   ├── favicon.ico             # Favicon
│   ├── index.html              # html file for client side rendering
│   └── server.tsx              # Entry point for server side rendering.
├── translations                # For json translations.
├── .dockerignore               # Tells docker which files to ignore.
├── .editorconfig               # Configuration for editors.
├── .gitignore                  # Tells git which files to ignore.
├── .travis.yml                 # Travis file.
├── Dockerfile                  # Dockerfile.
├── LICENSE                     # License file
├── package.json                # Package configuration.
├── package-lock.json           # Package lock
├── README.md                   # This file
├── styleguide.config.js        # Config for doc
├── tsconfig.json               # TypeScript transpiler configuration.
└── tslint.json                 # Configures tslint.
```

## Installation

You can clone from this repository and use master

```bash
$ git clone https://github.com/crazyfactory/ts-react-boilerplate
$ cd ts-react-boilerplate
$ npm install
```

## Usage

All commands defaults to development environment. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ npm start # This starts the app in development mode

# Starting it with the production build
$ NODE_ENV=production npm start # or
$ npm run start:prod

# Building 

$ npm build # This builds the app in development mode

# Commands below builds the production build
$ NODE_ENV=production npm build # or
$ npm run build:prod

# Testing
$ npm test

# Too see doc, run this command, and go to localhost:6060. Any component that has .md file with the same name will be
# doc-generated.
$ npm run doc
```

For Windows users, we recommend using the shortcuts instead of setting environment variables because they work a little
different on Windows.

#### Sentry
Create main.local.js in config folder and export an object that has `sentry` key like so:
```
module.exports = {
  sentry: {
    dsn: YOUR_DSN,
    release: YOUR_RELEASE_VERSION
  }
  
  // other configs
  ...
}
```

## Credits

This boilerplate is based on [Vortigern](https://github.com/barbar/vortigern) and is heavily updated.
This boilerplate is released under the [MIT license](LICENSE).

___

## [Crazy Factory](https://www.crazy-factory.com/en-US/)

Crazy factory is an online shop which manufactures piercings, jewellery, mobile covers, etc. **All at factory prices!**

You can contact us at [dev@crazy-factory.com](mailto:dev@crazy-factory.com)

Be sure to check out available [jobs at Crazy](http://stackoverflow.com/jobs/companies/Crazy-Factory).
