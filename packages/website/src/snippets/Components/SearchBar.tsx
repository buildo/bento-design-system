import * as React from "react";
import { SearchBar } from "..";

export default function SearchBarExample() {
  const [value, setValue] = React.useState("");
  return <SearchBar placeholder="Search a value..." value={value} onChange={setValue} />;
}
