import * as React from "react";
import useGlobalData from "@docusaurus/useGlobalData";
import { useComponentProps } from "./useComponentMetadata";

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
          {props.map((prop) => {
            return (
              <tr key={prop}>
                <td>
                  <code>{prop.name}</code>
                </td>
                <td>
                  <code>{prop.type}</code>
                </td>
                <td>{prop.defaultValue && <code>{prop.defaultValue.value}</code>}</td>
                <td>{prop.required ? "Yes" : "No"}</td>
                <td>{prop.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else return null;
};
