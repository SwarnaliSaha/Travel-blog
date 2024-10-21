import { Route, Routes } from "react-router-dom";
import LandingPage from "./Landing/Landing";
import Blogs from "./Blogs/Blogs";
import Blog from "./Blog/Blog";

export default function StaticRoutes() {
  const routes = [
    {
      path: "/Travel-blog",
      component: <LandingPage />,
    },
    {
      path: "/",
      component: <LandingPage />,
    },
    {
        path : "/blogs",
        component : <Blogs />
    },
    {
      path : "/blogs/:id",
      component : <Blog />
  }
  ];
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} element={route.component}>
            {route.children &&
              route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
          </Route>
        );
      })}
    </Routes>
  );
}
