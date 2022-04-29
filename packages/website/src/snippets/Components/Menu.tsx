import * as React from "react";
import { Avatar, Box, Menu } from "..";

export default function MenuExample() {
  return (
    <Menu
      size="large"
      items={[
        {
          label: "Item 1",
          onPress: () => window.alert("Item 1"),
        },
        {
          label: "Item 2 (link)",
          href: "https://www.google.com",
          target: "_blank",
        },
        {
          label: "Item 3",
          onPress: () => {},
          disabled: true,
        },
      ]}
      trigger={(ref, triggerProps, { toggle }) => (
        <Box
          ref={ref}
          display="inline-block"
          onClick={() => toggle()}
          cursor="pointer"
          {...triggerProps}
        >
          <Avatar color="violet" />
        </Box>
      )}
      offset={10}
      dividers
      initialIsOpen
    />
  );
}
