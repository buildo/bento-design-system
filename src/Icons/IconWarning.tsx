import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconWarning(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M2.52 22.412h18.96c1.94 0 3.148-2.102 2.178-3.777l-9.48-16.38c-.97-1.674-3.387-1.674-4.356 0l-9.48 16.38c-.97 1.675.239 3.777 2.178 3.777ZM12 13.6a1.263 1.263 0 0 1-1.259-1.259V9.822c0-.692.567-1.259 1.259-1.259.693 0 1.259.567 1.259 1.26v2.517c0 .693-.566 1.26-1.259 1.26Zm1.259 5.036h-2.518v-2.518h2.518v2.518Z" />
    </svg>
  );
}
