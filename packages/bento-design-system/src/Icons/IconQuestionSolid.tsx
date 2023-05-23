import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconQuestionSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12.996 2.25a9.75 9.75 0 1 0 9.75 9.75 9.76 9.76 0 0 0-9.75-9.75Zm0 15.75a1.126 1.126 0 1 1 0-2.251 1.126 1.126 0 0 1 0 2.251Zm.75-4.568v.068a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75c1.24 0 2.25-.844 2.25-1.875 0-1.031-1.01-1.875-2.25-1.875s-2.25.844-2.25 1.875v.375a.75.75 0 0 1-1.5 0v-.375c0-1.86 1.682-3.375 3.75-3.375 2.069 0 3.75 1.514 3.75 3.375 0 1.63-1.29 2.993-3 3.307Z" />
    </svg>
  );
}
