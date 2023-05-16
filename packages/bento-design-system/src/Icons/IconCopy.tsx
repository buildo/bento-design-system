import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconCopy(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M20.25 3h-12a.75.75 0 0 0-.75.75V7.5H3.75a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75V16.5h3.75a.75.75 0 0 0 .75-.75v-12a.75.75 0 0 0-.75-.75ZM15 19.5H4.5V9H15v10.5Zm4.5-4.5h-3V8.25a.75.75 0 0 0-.75-.75H9v-3h10.5V15Z" />
    </svg>
  );
}
