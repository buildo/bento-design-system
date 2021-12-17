import { Box } from "../../src/Box/Box";
import "../theme.css";

export default {
  title: "Box",
  component: Box,
};

export const Primary = () => {
  return <Box fontFamily="default">Test</Box>;
};
