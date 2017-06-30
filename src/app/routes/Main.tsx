import * as React from "react";
import {routeNode} from "react-router5";
import {About} from "../containers/About";
import {Counter} from "../containers/Counter";
import {Home} from "../containers/Home";
import {Stars} from "../containers/Stars";

const components = {
  about: About,
  counter: Counter,
  main: Home,
  stars: Stars
};

function main(props: any): React.CElement<any, any> {
  const { route } = props;
  const segment = route.name.split(".")[0];
  return React.createElement(components[segment] || <div>Not found</div>);
}

const Main = routeNode("")(main);

export default Main;
