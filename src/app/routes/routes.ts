interface IRoute {
  name: string;
  path: string;
}

const routes: IRoute[] = [
  {name: "main", path: "/"},
  {name: "about", path: "/about"},
  {name: "counter", path: "/counter"},
  {name: "stars", path: "/stars"}
];
export default routes;
