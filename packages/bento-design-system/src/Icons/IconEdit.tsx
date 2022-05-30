import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconEdit(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M18.116 1.045a3.422 3.422 0 1 1 4.84 4.84L21.597 7.24l-4.84-4.84 1.358-1.356Zm-3.777 3.777L0 19.16V24h4.84L19.18 9.661l-4.843-4.84h.002Z" />
    </svg>
  );
}
