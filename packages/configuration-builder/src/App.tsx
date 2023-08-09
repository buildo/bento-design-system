import { useState } from "react";
import { ColorConfig, ColorEditor } from "./ColorEditor/ColorEditor";
import { Stack, unsafeLocalizedString } from "@buildo/bento-design-system";
import { HexColor } from "./utils/colorUtils";
import { Header } from "./Header/Header";

function App() {
  const [value, setValue] = useState<ColorConfig>({
    keyColor: "#1A212B" as HexColor,
    hue: 215,
    saturation: 25,
    lightnessInterpolation: "Linear",
    keyColorLocked: true,
  });

  return (
    <Stack space={0}>
      <Header />
      <ColorEditor name={unsafeLocalizedString("Brand color")} value={value} onChange={setValue} />
    </Stack>
  );
}

export default App;
