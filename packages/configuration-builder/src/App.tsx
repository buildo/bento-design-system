import { Box, Divider } from "@buildo/bento-design-system";
import { Header } from "./Header/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export function App() {
  return (
    <Box display="flex" flexDirection="column" height="full">
      <Header />
      <Divider />
      <Box display="flex" flexGrow={1} flexDirection="column">
        <RouterProvider router={router} />
      </Box>
    </Box>
  );
}
