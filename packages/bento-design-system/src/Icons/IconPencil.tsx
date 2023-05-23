import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPencil(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m22.307 6.878-4.189-4.19a1.5 1.5 0 0 0-2.121 0L4.436 14.25a1.487 1.487 0 0 0-.44 1.06v4.19a1.5 1.5 0 0 0 1.5 1.5h4.19a1.488 1.488 0 0 0 1.06-.44L22.306 9a1.5 1.5 0 0 0 0-2.122ZM9.687 19.5h-4.19v-4.19l8.25-8.25 4.19 4.19-8.25 8.25Zm9.31-9.311L14.806 6l2.25-2.25 4.19 4.189-2.25 2.25Z" />
    </svg>
  );
}
