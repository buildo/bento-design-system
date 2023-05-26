import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPencil(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m21.31 6.878-4.188-4.19a1.5 1.5 0 0 0-2.122 0L3.44 14.25A1.487 1.487 0 0 0 3 15.31v4.19A1.5 1.5 0 0 0 4.5 21h4.19a1.487 1.487 0 0 0 1.06-.44L21.31 9a1.5 1.5 0 0 0 0-2.122ZM8.69 19.5H4.5v-4.19l8.25-8.25 4.19 4.19-8.25 8.25ZM18 10.189 13.81 6l2.25-2.25 4.19 4.189-2.25 2.25Z" />
    </svg>
  );
}
