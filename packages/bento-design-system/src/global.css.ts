import { globalStyle } from "@vanilla-extract/css";

globalStyle("#root", {
  // NOTE(gabro): we make sure the root element introduces a stacking context, so that portals
  // (that get rendered below the #root element) are always rendered in front of it
  // (e.g.modals, tooltips etc).
  // This assumes the root element is identified by #root, which is the case for regular CRA apps.
  isolation: "isolate",
});

globalStyle("html, body", {
  margin: 0,
});
