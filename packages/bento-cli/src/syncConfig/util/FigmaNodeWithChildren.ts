import * as Figma from "figma-api";

export type FigmaNodeWithChildren = Figma.Node & { children?: FigmaNodeWithChildren[] };
