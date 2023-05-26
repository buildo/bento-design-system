import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconQuestionSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25ZM12 18a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 18Zm.75-4.568v.068a.75.75 0 1 1-1.5 0v-.75A.75.75 0 0 1 12 12c1.24 0 2.25-.844 2.25-1.875 0-1.031-1.01-1.875-2.25-1.875s-2.25.844-2.25 1.875v.375a.75.75 0 1 1-1.5 0v-.375c0-1.86 1.682-3.375 3.75-3.375s3.75 1.514 3.75 3.375c0 1.63-1.29 2.993-3 3.307Z" />
    </svg>
  );
}
