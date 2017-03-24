import { About, App, Counter, Home, Stars } from "containers";
import * as React from "react";
import { IndexRoute, Route } from "react-router";

const routes =  (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="counter" component={Counter} />
    <Route path="stars" component={Stars} />
  </Route>
);
export default routes;
