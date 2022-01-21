import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconWarning(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M2.51973 22.4124H21.4803C23.4191 22.4124 24.6278 20.3099 23.6583 18.6354L14.1781 2.25585C13.2086 0.581382 10.7914 0.581382 9.82193 2.25585L0.341656 18.6354C-0.627774 20.3099 0.580866 22.4124 2.51973 22.4124ZM12 13.5994C11.3076 13.5994 10.741 13.0329 10.741 12.3404V9.82245C10.741 9.13 11.3076 8.56345 12 8.56345C12.6925 8.56345 13.259 9.13 13.259 9.82245V12.3404C13.259 13.0329 12.6925 13.5994 12 13.5994ZM13.259 18.6354H10.741V16.1174H13.259V18.6354Z" />
    </svg>
  );
}
