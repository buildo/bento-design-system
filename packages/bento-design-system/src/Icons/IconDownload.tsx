import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconDownload(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M21 14.25v5.25a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-5.25a.75.75 0 1 1 1.5 0v5.25h15v-5.25a.75.75 0 1 1 1.5 0Zm-9.53.53a.747.747 0 0 0 1.06 0l3.75-3.75a.75.75 0 1 0-1.06-1.06l-2.47 2.47V3.75a.75.75 0 1 0-1.5 0v8.69L8.78 9.97a.75.75 0 0 0-1.06 1.06l3.75 3.75Z" />
    </svg>
  );
}
