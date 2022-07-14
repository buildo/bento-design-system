import React from "react";
import "react-input-mask";

declare module "react-input-mask" {
  interface Props {
    children?: (inputProps: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
  }
}
