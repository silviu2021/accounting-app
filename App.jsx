import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Parents from "./pages/Parents";
import Payments from "./pages/Payments";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Dashboard /> },
  { path: "/parents", element: <Parents /> },
  { path: "/payments", element: <Payments /> },
  { path: "/projects", element: <Projects /> },
  { path: "/*", element: <NotFound /> },
]);

export default () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
