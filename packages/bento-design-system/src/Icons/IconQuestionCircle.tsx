import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconQuestionCircle(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M13.125 16.875a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 6.75c-2.068 0-3.75 1.514-3.75 3.375v.375a.75.75 0 1 0 1.5 0v-.375c0-1.031 1.01-1.875 2.25-1.875s2.25.844 2.25 1.875C14.25 11.156 13.24 12 12 12a.75.75 0 0 0-.75.75v.75a.75.75 0 1 0 1.5 0v-.068c1.71-.314 3-1.678 3-3.307 0-1.86-1.682-3.375-3.75-3.375ZM21.75 12A9.75 9.75 0 1 1 12 2.25 9.76 9.76 0 0 1 21.75 12Zm-1.5 0A8.25 8.25 0 1 0 12 20.25 8.26 8.26 0 0 0 20.25 12Z" />
    </svg>
  );
}
