import { createBrowserRouter } from "react-router-dom";
import { MyTheme } from "./MyTheme";
import { Home } from "./Home";
import { ColorsSection } from "./ColorsSection/ColorsSection";
import { TokensSection } from "./TokensSection/TokensSection";
import { ElevationsSection } from "./ElevationsSection/ElevationsSection";

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
  {
    path: "/theme/elevations",
    element: <ElevationsSection />,
  },
  {
    path: "/theme/tokens",
    element: <TokensSection />,
  },
]);
