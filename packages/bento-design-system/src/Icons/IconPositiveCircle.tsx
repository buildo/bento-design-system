import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPositiveCircle(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M17.277 9.22a.75.75 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.061 0l-2.25-2.25a.75.75 0 1 1 1.061-1.06l1.72 1.72 4.719-4.72a.749.749 0 0 1 1.061 0Zm5.47 2.78a9.75 9.75 0 1 1-9.75-9.75 9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0a8.25 8.25 0 1 0-8.25 8.25 8.26 8.26 0 0 0 8.25-8.25Z" />
    </svg>
  );
}
