import { Label, Box } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { avatarRecipe } from "./Avatar.css";

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

export function Avatar({ color, name }: Props) {
  const config = useBentoConfig().avatar;
  const initial = name?.trim()[0];

  return (
    <Box display="flex">
      <Box
        className={avatarRecipe({
          color,
        })}
        borderRadius={config.radius}
        boxShadow={config.outline}
        style={{
          width: config.width,
          height: config.height,
        }}
      >
        {initial ? (
          <Label size={config.labelSize}>{initial}</Label>
        ) : (
          config.icon({
            size: config.iconSize,
            color: "primary",
          })
        )}
      </Box>
    </Box>
  );
}
