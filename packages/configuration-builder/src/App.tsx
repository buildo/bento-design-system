import { Stack } from "@buildo/bento-design-system";
import { Header } from "./Header/Header";
import { ThemeConfigurator } from "./ThemeConfigurator/ThemeConfigurator";

function App() {
  return (
    <Stack space={0}>
      <Header />
      <ThemeConfigurator />
    </Stack>
  );
}

export default App;
