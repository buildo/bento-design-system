import * as React from "react";
import { Body, Box, ContentWithSidebar, Inline } from "..";

export default function ContentWithSidebarExample() {
  return (
    <Box style={{ height: 300 }}>
      <ContentWithSidebar
        sidebarPosition="right"
        sidebarWidth="1/5"
        sidebarBackground="backgroundOverlay"
      >
        <Box height="full" display="flex" justifyContent="center" alignItems="center">
          <Body size="large">Main content</Body>
        </Box>
        <Box height="full" display="flex" justifyContent="center" alignItems="center">
          <Body size="large">Sidebar</Body>
        </Box>
      </ContentWithSidebar>
    </Box>
  );
}
