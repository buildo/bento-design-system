import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPositiveSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12.997 2.25a9.75 9.75 0 1 0 9.75 9.75 9.76 9.76 0 0 0-9.75-9.75Zm4.28 8.03-5.25 5.25a.748.748 0 0 1-1.061 0l-2.25-2.25a.75.75 0 1 1 1.061-1.06l1.72 1.72 4.719-4.72a.75.75 0 1 1 1.061 1.06Z" />
    </svg>
  );
}
