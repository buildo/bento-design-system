import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconInformative(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0Zm0 18c-.66 0-1.2-.54-1.2-1.2V12c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v4.8c0 .66-.54 1.2-1.2 1.2Zm1.2-10.8a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  );
}
