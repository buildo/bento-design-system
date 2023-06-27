import * as React from "react";
import { BentoConfigProvider, Chip, IconStar, Stack, Title } from "..";

export default function ConfigurationExample() {
  return (
    <Stack space={32}>
      <Stack space={12}>
        <Title size="small">Default icon</Title>
        <Chip color="indigo" label="Default" onDismiss={() => console.log("dismiss")} />
      </Stack>
      <Stack space={12}>
        <Title size="small">Custom icon icon</Title>
        <BentoConfigProvider value={{ chip: { closeIcon: IconStar } }}>
          <Chip color="indigo" label="Default" onDismiss={() => console.log("dismiss")} />
        </BentoConfigProvider>
      </Stack>
    </Stack>
  );
}
