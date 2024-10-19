import { Route, Routes } from "react-router-dom";
import LandingPage from "./Landing/Landing";
import Blogs from "./Blogs/Blogs";

export default function StaticRoutes() {
  const routes = [
    {
      path: "/",
      component: <LandingPage />,
    },
    {
        path : "/blogs/:id",
        component : <Blogs />
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
