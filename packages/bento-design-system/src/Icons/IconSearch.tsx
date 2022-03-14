import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgIconProps(props)}>
      <path d="M9.579 0A9.586 9.586 0 0 0 .136 7.972a9.58 9.58 0 0 0 6.269 10.65 9.585 9.585 0 0 0 8.56-1.11l5.923 5.916a1.797 1.797 0 1 0 2.54-2.54l-5.918-5.92A9.58 9.58 0 0 0 9.579 0Zm-5.99 9.582a5.988 5.988 0 0 1 5.99-5.989 5.99 5.99 0 0 1 4.236 10.224A5.99 5.99 0 0 1 3.589 9.582Z" />
    </svg>
  );
}
