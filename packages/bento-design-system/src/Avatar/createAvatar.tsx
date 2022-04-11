import { Label, unsafeLocalizedString } from "..";
import { avatarRecipe } from "./Avatar.css";
import { Box } from "../internal";
import { AvatarConfig } from "./Config";

type Props = {
  name?: string;
  color:
    | "grey"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "jade"
    | "blue"
    | "indigo"
    | "violet"
    | "pink";
};

export type { Props as AvatarProps };

export function createAvatar(config: AvatarConfig) {
  return function Avatar({ color, name }: Props) {
    const initial = name?.trim()[0];

    return (
      <Box display="flex">
        <Box
          className={avatarRecipe({
            color,
          })}
          width={config.width}
          height={config.height}
          borderRadius={config.radius}
        >
          {initial ? (
            <Label size={config.labelSize}>{unsafeLocalizedString(initial)}</Label>
          ) : (
            <config.icon size={16} color="primary" />
          )}
        </Box>
      </Box>
    );
  };
}
