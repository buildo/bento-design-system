import * as React from "react";
import { useComponentProps } from "./useComponentMetadata";

function getType(type: any): JSX.Element | null {
  if (!type) return null;
  if (type.name === "enum") {
    return <code>{type.value.map((v) => v.value).join(" | ")}</code>;
  }
  return type.name;
}

export const PropTable = ({ name }) => {
  const props = useComponentProps(name);

  if (props) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props).map((key) => {
            return (
              <tr key={key}>
                <td>
                  <code>{key}</code>
                </td>
                <td>
                  <code>{getType(props[key].type)}</code>
                </td>
                <td>{props[key].defaultValue && <code>{props[key].defaultValue.value}</code>}</td>
                <td>{props[key].required ? "Yes" : "No"}</td>
                <td>{props[key].description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else return null;
};
