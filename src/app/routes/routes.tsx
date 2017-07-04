import {AboutPage, App, CounterPage, HomePage, RegisterPage, StarsPage} from "containers";
import * as React from "react";
import {IndexRoute, Route} from "react-router";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="counter" component={CounterPage}/>
    <Route path="stars" component={StarsPage}/>
    <Route path="register" component={RegisterPage}/>
  </Route>
);
export default routes;
