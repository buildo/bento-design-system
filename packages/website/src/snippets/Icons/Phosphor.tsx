import * as React from "react";
import { Button, IconProps, Stack, svgIconProps } from "..";
import { Horse, Icon as PhosphorIcon } from "@phosphor-icons/react";

// NOTE(gabro): if you change this please keep it in sync with the snippet in the documentation markdown.
function phosphorToBento(Icon: PhosphorIcon) {
  return (props: IconProps) => {
    const { viewBox, ...svgProps } = svgIconProps(props);
    return <Icon width={undefined} height={undefined} {...svgProps} />;
  };
}

const IconHorse = phosphorToBento(Horse);

export default function PhosphorExample() {
  return (
    <Stack space={32} align="left">
      <IconHorse size={40} color="brandPrimary" />
      <Button
        kind="solid"
        hierarchy="primary"
        label="Hello"
        onPress={() => window.alert("Hello!")}
        icon={IconHorse}
      />
    </Stack>
  );
}
