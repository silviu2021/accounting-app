import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/*", element: <NotFound /> },
]);

export default () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
