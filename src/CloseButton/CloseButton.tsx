import { IconClose } from "..";
import { IconButton } from "../IconButton/IconButton";
import { IconButtonProps } from "../IconButton/IconButtonProps";

export function CloseButton(props: IconButtonProps) {
  return <IconButton {...props} icon={IconClose} />;
}
