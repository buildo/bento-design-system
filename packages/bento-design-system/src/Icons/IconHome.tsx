import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconHome(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m20.515 9.728-7.5-7.076a1.5 1.5 0 0 0-2.029-.01l-.01.01-7.491 7.076A1.5 1.5 0 0 0 3 10.833V19.5A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-8.667a1.5 1.5 0 0 0-.485-1.105ZM19.5 19.5h-15v-8.667l.01-.01L12 3.75l7.49 7.072.01.009V19.5Z" />
    </svg>
  );
}
