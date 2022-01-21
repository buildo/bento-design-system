import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconClose(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M23.4684 0.549793C23.3 0.381037 23.1 0.247152 22.8797 0.155803C22.6595 0.0644534 22.4235 0.0174326 22.185 0.0174326C21.9466 0.0174326 21.7106 0.0644534 21.4903 0.155803C21.2701 0.247152 21.0701 0.381037 20.9017 0.549793L12 9.43326L3.09833 0.531589C2.92979 0.363054 2.72972 0.229365 2.50951 0.138155C2.28931 0.0469448 2.0533 1.7758e-09 1.81496 0C1.57662 -1.7758e-09 1.3406 0.0469448 1.1204 0.138155C0.900203 0.229365 0.700123 0.363054 0.531589 0.531589C0.363054 0.700123 0.229365 0.900203 0.138155 1.1204C0.0469448 1.3406 -1.7758e-09 1.57662 0 1.81496C1.7758e-09 2.0533 0.0469448 2.28931 0.138155 2.50951C0.229365 2.72972 0.363054 2.92979 0.531589 3.09833L9.43326 12L0.531589 20.9017C0.363054 21.0702 0.229365 21.2703 0.138155 21.4905C0.0469448 21.7107 0 21.9467 0 22.185C0 22.4234 0.0469448 22.6594 0.138155 22.8796C0.229365 23.0998 0.363054 23.2999 0.531589 23.4684C0.700123 23.6369 0.900203 23.7706 1.1204 23.8618C1.3406 23.9531 1.57662 24 1.81496 24C2.0533 24 2.28931 23.9531 2.50951 23.8618C2.72972 23.7706 2.92979 23.6369 3.09833 23.4684L12 14.5667L20.9017 23.4684C21.0702 23.6369 21.2703 23.7706 21.4905 23.8618C21.7107 23.9531 21.9467 24 22.185 24C22.4234 24 22.6594 23.9531 22.8796 23.8618C23.0998 23.7706 23.2999 23.6369 23.4684 23.4684C23.6369 23.2999 23.7706 23.0998 23.8618 22.8796C23.9531 22.6594 24 22.4234 24 22.185C24 21.9467 23.9531 21.7107 23.8618 21.4905C23.7706 21.2703 23.6369 21.0702 23.4684 20.9017L14.5667 12L23.4684 3.09833C24.1602 2.40658 24.1602 1.24154 23.4684 0.549793Z" />
    </svg>
  );
}
