import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconInformative(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgIconProps(props)}>
      <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM12 18C11.34 18 10.8 17.46 10.8 16.8V12C10.8 11.34 11.34 10.8 12 10.8C12.66 10.8 13.2 11.34 13.2 12V16.8C13.2 17.46 12.66 18 12 18ZM13.2 7.2C13.2 7.86274 12.6627 8.4 12 8.4C11.3373 8.4 10.8 7.86274 10.8 7.2C10.8 6.53726 11.3373 6 12 6C12.6627 6 13.2 6.53726 13.2 7.2Z" />
    </svg>
  );
}
