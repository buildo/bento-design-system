import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconNegative(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.242 2.614c1.21-2.152 4.307-2.152 5.516 0l8.83 15.699c1.188 2.11-.336 4.716-2.756 4.716H3.17c-2.422 0-3.946-2.605-2.759-4.716l8.83-15.699Zm4.34 15.669a1.582 1.582 0 1 1-3.164 0 1.582 1.582 0 0 1 3.165 0ZM12 6.623a1.583 1.583 0 0 0-1.582 1.582v4.748a1.582 1.582 0 1 0 3.165 0V8.205A1.582 1.582 0 0 0 12 6.623Z"
      />
    </svg>
  );
}
