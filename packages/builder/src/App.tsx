import "@buildo/bento-design-system/index.css";
import "@buildo/bento-design-system/defaultTheme.css";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";
import { BentoProvider } from "@buildo/bento-design-system";
import { Showcase } from "./Showcase";
import { ConfiguratorProvider } from "./ConfiguratorContext";
import { Configurator } from "./Configurator";

function App() {
  return (
    <ConfiguratorProvider>
      <BentoProvider defaultMessages={defaultMessages}>
        <Configurator />
        <Showcase />
      </BentoProvider>
    </ConfiguratorProvider>
  );
}

export default App;
