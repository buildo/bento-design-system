import { IconProps, svgIconProps } from "@buildo/bento-design-system";
import {
  Atom,
  Cards,
  FigmaLogo,
  Subtract,
  type Icon as PhosphorIcon,
  TextAa,
  CaretRight,
  CheckCircle,
  Confetti,
  Diamond,
  DiamondsFour,
  Layout,
  Eyedropper,
  Swatches,
  Planet,
  CloudMoon,
} from "@phosphor-icons/react";

function phosphorToBento(Icon: PhosphorIcon) {
  return (props: IconProps) => {
    const { viewBox, ...svgProps } = svgIconProps(props);
    return <Icon width={undefined} height={undefined} {...svgProps} />;
  };
}

export const IconFigmaLogo = phosphorToBento(FigmaLogo);
export const IconAtom = phosphorToBento(Atom);
export const IconCards = phosphorToBento(Cards);
export const IconCaretRight = phosphorToBento(CaretRight);
export const IconCheckCircle = phosphorToBento(CheckCircle);
export const IconConfetti = phosphorToBento(Confetti);
export const IconDiamond = phosphorToBento(Diamond);
export const IconDiamondsFour = phosphorToBento(DiamondsFour);
export const IconEyedropper = phosphorToBento(Eyedropper);
export const IconLayout = phosphorToBento(Layout);
export const IconSubtract = phosphorToBento(Subtract);
export const IconSwatches = phosphorToBento(Swatches);
export const IconTextAa = phosphorToBento(TextAa);
export const IconPlanet = phosphorToBento(Planet);
export const IconCloudMoon = phosphorToBento(CloudMoon);
