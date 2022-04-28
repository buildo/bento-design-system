import * as React from "react";
import { SearchBar } from "..";
import { formatMessage } from "../formatMessage";

export default function SearchBarExample() {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar placeholder={formatMessage("Search a value...")} value={value} onChange={setValue} />
  );
}
