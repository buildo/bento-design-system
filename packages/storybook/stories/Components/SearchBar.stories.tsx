import { useState } from "react";
import { SearchBar } from "../";

const meta = {
  component: SearchBar,
  args: {
    "aria-label": "Search for anything",
    placeholder: "Search for anything",
  },
};

export default meta;

export const searchBar = {
  render: (args: any) => {
    const [value, onChange] = useState("design systems");
    return <SearchBar {...args} value={value} onChange={onChange} />;
  },
};
