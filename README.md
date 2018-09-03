# ts-react-boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/crazyfactory/ts-react-boilerplate.svg?token=817c7964cfab1973415f903cc9bde50f4d9ea8d7fe44c1b0e722569f0c99438d)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/crazyfactory/ts-react-boilerplate.svg?branch=master)](https://travis-ci.org/crazyfactory/ts-react-boilerplate)
[![Dependency Status](https://david-dm.org/crazyfactory/ts-react-boilerplate.svg)](https://david-dm.org/crazyfactory/ts-react-boilerplate)
[![devDependency Status](https://david-dm.org/crazyfactory/ts-react-boilerplate/dev-status.svg)](https://david-dm.org/crazyfactory/ts-react-boilerplate?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/crazyfactory/ts-react-boilerplate.svg)](https://github.com/crazyfactory/ts-react-boilerplate/issues)
___

##### Based on [Vortigern](https://github.com/barbar/vortigern)

[![TypeScript](https://barbaruploads.s3.amazonaws.com/bicoz/typescript.png)](https://www.typescriptlang.org/)
[![React](https://barbaruploads.s3.amazonaws.com/bicoz/react.png)](https://github.com/facebook/react)
[![Redux](https://barbaruploads.s3.amazonaws.com/bicoz/redux.png)](https://github.com/reactjs/redux)

## Libraries
This boilerplate uses the following libraries and tools:

#### Core
- [Typescript](https://www.typescriptlang.org/)
- [React](https://github.com/facebook/react) & [React DOM](https://github.com/facebook/react) for views.
- [Router5](https://github.com/router5) to handle in-app routing.
- [Redux](https://github.com/reactjs/redux) for managing application state.
- [React Redux](https://github.com/reactjs/react-redux) to use React-Redux bindings.
- [React Router5](https://github.com/router5) & [Redux-Router5](https://github.com/router5) integrate router5 with react and redux

#### Utilities
- [Redux Saga](https://github.com/redux-saga/redux-saga) make side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.
- [React Intl](https://github.com/yahoo/react-intl) internationalize React apps
- [Redux Form](https://github.com/erikras/redux-form) keep form state in a Redux store
- [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) with [ES6-Promise](https://github.com/stefanpenner/es6-promise) for using fetch api on both client & server side.
- [React Helmet](https://github.com/nfl/react-helmet)
- [RavenJS](https://github.com/getsentry/raven-js) for capturing exceptions during run time
- [Raven for Redux](https://github.com/captbaritone/raven-for-redux) for error using sentry (use `config/main.local.js` to enable sentry)
- [TypeStyle](https://github.com/typestyle/typestyle) make css typesafe

#### Build System
- [Webpack](https://github.com/webpack/webpack) for bundling.
  - [Awesome TypeScript Loader](https://github.com/s-panferov/awesome-typescript-loader) as ts loader.
  - [React Hot Loader](https://github.com/gaearon/react-hot-loader) for providing hot reload capability to our development server
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
- [TS Lint](https://github.com/palantir/tslint) for linting TypeScript files.
- [Redux Logger](https://github.com/theaqua/redux-logger)
- [Redux DevTools](https://github.com/gaearon/redux-devtools)
- [Chalk](https://github.com/chalk/chalk) for colored terminal logs.

#### Testing
- [Jest](https://github.com/facebook/jest) as test runner.
- [TS Jest](https://github.com/kulshekhar/ts-jest) as Jest preprocessor
- [Enzyme](https://github.com/airbnb/enzyme) for rendering React Components.
- [Jest Enzyme](https://github.com/blainekasten/enzyme-matchers) for asserting React Components.
- [Wallaby](http://wallabyjs.com) intelligent test runner for JavaScript that continuously runs your tests.

## Directory Structure
```bash
.
├── build                       # Built, ready to serve app.
├── config                      # Root folder for configurations.
│   ├── types                   # Global type definitions, written by us.
│   ├── webpack                 # Webpack configurations.
│   ├── main.js                 # Generic App configurations.
│   └── main.local.js           # Local App configurations.
├── node_modules                # Node Packages.
├── src                         # Source code.
│   ├── app                     # App folder.
│   │ ├── components            # React Components.
│   │ ├── containers            # React Containers.
│   │ ├── helpers               # Helper Functions & Components.
│   │ ├── images                # Images folder.
│   │ ├── redux                 # Redux related code aka data layer of the app.
│   │ │   ├── modules           # Redux modules.   
│   │ │   ├── rootReducer.ts    # Main reducers file to combine them.  
│   │ │   └── configureStore.ts # Redux store, contains global app state.    
│   │ ├── routes                # Routes.
│   │ └── sagas                 # Saga files.
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
├── tsconfig.json               # TypeScript transpiler configuration.
├── tslint.json                 # Configures tslint.
└── wallaby.conf.js             # Configuraton for wallaby testing
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
```

For Windows users, we recommend using the shortcuts instead of setting environment variables because they work a little different on Windows.

#### Raven
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
