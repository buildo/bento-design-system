import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPositiveCircle(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M16.28 9.22a.748.748 0 0 1 0 1.06l-5.25 5.25a.747.747 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0ZM21.75 12A9.75 9.75 0 1 1 12 2.25 9.76 9.76 0 0 1 21.75 12Zm-1.5 0A8.25 8.25 0 1 0 12 20.25 8.26 8.26 0 0 0 20.25 12Z" />
    </svg>
  );
}
