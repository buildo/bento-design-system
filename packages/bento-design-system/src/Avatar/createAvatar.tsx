import { Label } from "..";
import { avatarImage, avatarRecipe } from "./Avatar.css";
import { Box } from "../internal";
import { AvatarConfig } from "./Config";
import { useEffect, useState } from "react";

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
  imageSrc?: string;
};

export type { Props as AvatarProps };

export function createAvatar(config: AvatarConfig) {
  return function Avatar({ color, name, imageSrc }: Props) {
    const initial = name?.trim()[0];

    const [imageAvailable, setImageAvailable] = useState<boolean | undefined>(undefined);

    useEffect(() => {
      setImageAvailable(undefined);
    }, [imageSrc]);

    const handleImageLoaded = () => {
      setImageAvailable(true);
    };
    const handleImageErrored = () => {
      setImageAvailable(false);
    };

    return (
      <Box display="flex">
        <Box
          className={avatarRecipe({
            color,
          })}
          width={config.width}
          height={config.height}
          borderRadius={config.radius}
          boxShadow={config.outline}
        >
          {imageSrc && imageAvailable !== false ? (
            <Box
              as="img"
              display={imageAvailable ? "block" : "none"}
              src={imageSrc}
              className={avatarImage}
              onLoad={handleImageLoaded}
              onError={handleImageErrored}
            />
          ) : initial ? (
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
  };
}
