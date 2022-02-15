import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconCheck(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.498 3.502a1.716 1.716 0 0 1 0 2.427L9.77 19.658a1.716 1.716 0 0 1-2.426 0L.482 12.793a1.716 1.716 0 0 1 2.426-2.426l5.65 5.65L21.072 3.503a1.716 1.716 0 0 1 2.426 0Z"
      />
    </svg>
  );
}
