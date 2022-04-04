import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPositive(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24Zm5.56-13.94a1.5 1.5 0 0 0-2.12-2.12l-4.94 4.939-1.94-1.94a1.5 1.5 0 0 0-2.12 2.121l3 3a1.5 1.5 0 0 0 2.12 0l6-6Z"
      />
    </svg>
  );
}
