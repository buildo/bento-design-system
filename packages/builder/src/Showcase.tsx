import { BentoProvider, Box, Button, Inline, Inset, vars } from "@buildo/bento-design-system";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useConfiguratorContext } from "./ConfiguratorContext";

export function Showcase() {
  const { value } = useConfiguratorContext();

  return (
    <BentoProvider defaultMessages={defaultMessages} config={value.config}>
      <Inset space={16}>
        <Box
          style={assignInlineVars<any>(vars, value.theme)}
          borderWidth={1}
          borderStyle="dashed"
          borderColor="outlineDecorative"
          padding={16}
        >
          <Inline space={0}>
            <Button kind="solid" hierarchy="primary" label="Click me!" onPress={() => {}} />
          </Inline>
        </Box>
      </Inset>
    </BentoProvider>
  );
}
