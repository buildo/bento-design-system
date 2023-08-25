import { createBrowserRouter } from "react-router-dom";
import { MyTheme } from "./MyTheme";
import { Home } from "./Home";
import { ColorsSection } from "./ColorsSection/ColorsSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/theme",
    element: <MyTheme />,
  },
  {
    path: "/theme/colors",
    element: <ColorsSection />,
  },
  {
    path: "/theme/typography",
    element: null,
  },
]);
