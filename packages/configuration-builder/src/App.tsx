import { useState } from "react";
import { ColorConfig, ColorEditor } from "./ColorEditor/ColorEditor";
import { unsafeLocalizedString } from "@buildo/bento-design-system";
import { HexColor } from "./utils/colorUtils";

function App() {
  const [value, setValue] = useState<ColorConfig>({
    keyColor: "#1A212B" as HexColor,
    hue: 215,
    saturation: 25,
    lightnessInterpolation: "Linear",
    keyColorLocked: true,
  });

  return (
    <ColorEditor name={unsafeLocalizedString("Brand color")} value={value} onChange={setValue} />
  );
}

export default App;
