import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconCheck(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m21.53 7.28-12 12a.748.748 0 0 1-1.06 0l-5.25-5.25a.75.75 0 1 1 1.06-1.06L9 17.69 20.47 6.22a.75.75 0 1 1 1.06 1.06Z" />
    </svg>
  );
}
