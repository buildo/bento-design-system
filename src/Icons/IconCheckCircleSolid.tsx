import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconCheckCircleSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0ZM8.748 17.148 4.44 12.84a1.197 1.197 0 0 1 1.692-1.692L9.6 14.604l8.256-8.256a1.197 1.197 0 0 1 1.692 1.692l-9.108 9.108a1.195 1.195 0 0 1-1.692 0Z" />
    </svg>
  );
}
