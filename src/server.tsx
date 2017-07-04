const appConfig = require("../config/main");

import * as e6p from "es6-promise";
import "isomorphic-fetch";

import * as React from "react";
import { renderToString } from "react-dom/server";

import {Provider} from "react-redux";
import {configureStore} from "./app/redux/configureStore";
import rootSaga from "./app/sagas/rootSaga";

import {Html} from "./app/containers";
import {App} from "./app/containers/App";
import configureRouter from "./app/routes/configureRouter";
(e6p as any).polyfill();
const manifest = require("../build/manifest.json");

const express = require("express");
const path = require("path");
const Chalk = require("chalk");
const favicon = require("serve-favicon");

const app = express();

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackConfig = require("../config/webpack/dev");
  const webpackCompiler = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(webpackCompiler, {
    historyApiFallback: true,
    hot: true,
    inline: true,
    lazy: false,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    stats: {colors: true}
  }));

  app.use(require("webpack-hot-middleware")(webpackCompiler));
}

app.use(favicon(path.join(__dirname, "public/favicon.ico")));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  if (!appConfig.ssr) {
    res.sendFile(path.resolve("./build/index.html"), {}, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
    return;
  }

  const router = configureRouter();

  router.start(req.url, (error, state) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    const store = configureStore(router, {router: {route: state}} as any);

    store.runSaga(rootSaga).done.then(() => {
      // deep clone state because store will be changed during the second render in componentWillMount
      const initialState = JSON.parse(JSON.stringify(store.getState()));

      // tslint:disable-next-line
      console.time("second render");

      // render again from the initial data
      const markup = renderToString(
        <Provider store={store} key="provider">
          <App />
        </Provider>
      );

      // tslint:disable-next-line
      console.timeEnd("second render");

      res.status(200).send(renderHTML(markup, initialState));
    }).catch((err: any) => {
      console.error(err.message);
      res.status(500).send(err.message);
    });

    // tslint:disable-next-line
    console.time("first render");

    // first render to activate componentWillMount to dispatch actions for loading initial data
    renderToString(
      <Provider store={store} key="provider">
        <App/>
      </Provider>
    );

    // tslint:disable-next-line
    console.timeEnd("first render");

    // dispatching END will cause the root saga to terminate after all fired tasks terminate
    store.close();
  });
});

app.listen(appConfig.port, appConfig.host, (err) => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`
    ));
  }
});

function renderHTML(markup: string, initialState: any): string {
  const html = renderToString(
    <Html markup={markup} manifest={manifest} initialState={initialState}/>
  );

  return `<!doctype html> ${html}`;
}
