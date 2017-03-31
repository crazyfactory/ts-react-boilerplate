const appConfig = require("../config/main");

import * as e6p from "es6-promise";
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import {Provider} from "react-redux";
import {createMemoryHistory, match} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {configureStore} from "./app/redux/configureStore";
import routes from "./app/routes/routes";

import {Html} from "./app/containers";
(e6p as any).polyfill();
const { ReduxAsyncConnect, loadOnServer } = require("redux-connect");
const manifest = require("../build/manifest.json");

const express = require("express");
const path = require("path");
const compression = require("compression");
const Chalk = require("chalk");
const favicon = require("serve-favicon");

const app = express();

app.use(compression());

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
    stats: { colors: true }
  }));

  app.use(require("webpack-hot-middleware")(webpackCompiler));
}

app.use(favicon(path.join(__dirname, "public/favicon.ico")));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location },
        (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = Object.assign({}, renderProps, { store });

        loadOnServer(asyncRenderData).then(() => {
          const markup = ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          if (appConfig.ssr) {
            res.status(200).send(renderHTML(markup, store));
          }else {
            res.sendFile(path.resolve("./build/index.html"), {}, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        });
      } else {
        res.status(404).send("Not Found?");
      }
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

function renderHTML(markup: string, store: any): string {
  const html = ReactDOMServer.renderToString(
    <Html markup={markup} manifest={manifest} store={store} />
  );

  return `<!doctype html> ${html}`;
}
