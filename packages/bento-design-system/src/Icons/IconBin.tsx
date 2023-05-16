import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconBin(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M20.25 4.5H16.5v-.75a2.25 2.25 0 0 0-2.25-2.25h-4.5A2.25 2.25 0 0 0 7.5 3.75v.75H3.75a.75.75 0 0 0 0 1.5h.75v13.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 1 0 0-1.5ZM9 3.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75v.75H9v-.75Zm9 15.75H6V6h12v13.5Zm-7.5-9.75v6a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0Zm4.5 0v6a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0Z" />
    </svg>
  );
}
