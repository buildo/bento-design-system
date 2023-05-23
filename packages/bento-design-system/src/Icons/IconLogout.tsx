import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconLogout(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M10.498 20.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3h5.25a.75.75 0 0 1 0 1.5h-5.25v15h5.25a.75.75 0 0 1 .75.75Zm10.28-8.78-3.75-3.75a.75.75 0 1 0-1.061 1.06l2.47 2.47H9.749a.75.75 0 1 0 0 1.5h8.688l-2.47 2.47a.75.75 0 0 0 1.061 1.06l3.75-3.75a.749.749 0 0 0 0-1.06Z" />
    </svg>
  );
}
