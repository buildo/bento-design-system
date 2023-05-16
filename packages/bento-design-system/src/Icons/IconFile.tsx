import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconFile(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m20.03 7.72-5.25-5.25a.75.75 0 0 0-.53-.22h-9a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-12a.75.75 0 0 0-.22-.53ZM15 4.81l2.69 2.69H15V4.81Zm3.75 15.44H5.25V3.75h8.25v4.5a.75.75 0 0 0 .75.75h4.5v11.25Z" />
    </svg>
  );
}
