import * as React from "react";
import { useComponentConfig } from "./useComponentMetadata";

export const ConfigTable = ({ name }) => {
  const config = useComponentConfig(name);

  if (config) {
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
          {config.map((conf) => {
            return (
              <tr key={conf.name}>
                <td>
                  <code>{conf.name}</code>
                </td>
                <td>
                  <code>{conf.type}</code>
                </td>
                <td>{conf.defaultValue && <code>{conf.defaultValue.value}</code>}</td>
                <td>{conf.required ? "Yes" : "No"}</td>
                <td>{conf.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else return null;
};
