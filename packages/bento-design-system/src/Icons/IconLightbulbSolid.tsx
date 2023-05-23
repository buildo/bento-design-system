import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconLightbulbSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M16.5 21.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 1 1 0-1.5h7.5a.75.75 0 0 1 .75.75Zm3.75-12a8.208 8.208 0 0 1-3.154 6.488 1.522 1.522 0 0 0-.596 1.2V18a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 18v-.563a1.5 1.5 0 0 0-.584-1.186A8.21 8.21 0 0 1 3.75 9.796c-.024-4.468 3.587-8.19 8.051-8.296a8.25 8.25 0 0 1 8.449 8.25Zm-3.01-.876a5.4 5.4 0 0 0-4.365-4.364.75.75 0 1 0-.25 1.48c1.554.261 2.872 1.58 3.135 3.136a.75.75 0 0 0 1.48-.252Z" />
    </svg>
  );
}
