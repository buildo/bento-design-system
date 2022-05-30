import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconEye(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 4C6.545 4 1.887 7.393 0 12.182c1.887 4.789 6.545 8.182 12 8.182 5.454 0 10.113-3.393 12-8.182C22.113 7.392 17.454 4 12 4Zm0 13.636a5.457 5.457 0 0 1-5.455-5.454A5.457 5.457 0 0 1 12 6.727a5.457 5.457 0 0 1 5.454 5.455A5.457 5.457 0 0 1 12 17.636Zm0-8.727a3.268 3.268 0 0 0-3.273 3.273A3.268 3.268 0 0 0 12 15.454a3.268 3.268 0 0 0 3.273-3.272A3.268 3.268 0 0 0 12 8.909Z" />
    </svg>
  );
}
