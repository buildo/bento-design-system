import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { ThemeConfigurator } from "./ThemeConfigurator/ThemeConfigurator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/theme",
    element: <ThemeConfigurator />,
  },
]);
