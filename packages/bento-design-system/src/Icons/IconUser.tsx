import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconUser(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M22.645 19.875c-1.427-2.468-3.628-4.239-6.196-5.078a6.75 6.75 0 1 0-6.905 0c-2.568.839-4.768 2.609-6.196 5.078a.75.75 0 1 0 1.298.75c1.767-3.052 4.888-4.875 8.35-4.875 3.463 0 6.585 1.823 8.35 4.875a.75.75 0 1 0 1.3-.75ZM7.747 9a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" />
    </svg>
  );
}
