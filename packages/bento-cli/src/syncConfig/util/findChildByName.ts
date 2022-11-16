import * as Figma from "figma-api";
import { NodeType } from "figma-api";
import { FigmaNodeWithChildren } from "./FigmaNodeWithChildren.js";

export function findChildByName<T extends NodeType = "FRAME">(
  n: FigmaNodeWithChildren,
  name: string,
  nodeType?: T
): Figma.Node<T> {
  if (n.children) {
    for (const child of n.children) {
      if (child.name === name) {
        if (nodeType && child.type !== nodeType) {
          throw new Error(
            `Child node named ${name} does not match the expected type.\nExpected: ${nodeType}\nActual: ${child.type}`
          );
        }
        return child as unknown as Figma.Node<T>;
      } else if (child.children) {
        try {
          return findChildByName(child, name, nodeType);
        } catch {
          continue;
        }
      }
    }
  }

  throw new Error(`Could not found child node named ${name} in component ${n.name}`);
}

export function findChild<T extends NodeType = "FRAME">(
  n: FigmaNodeWithChildren,
  predicate: (n: FigmaNodeWithChildren) => boolean,
  nodeType?: T
): Figma.Node<T> {
  if (n.children) {
    for (const child of n.children) {
      if (predicate(child)) {
        if (nodeType && child.type !== nodeType) {
          throw new Error(
            `Child node matches the predicate but does not match the expected type.\nExpected: ${nodeType}\nActual: ${child.type}`
          );
        }
        return child as unknown as Figma.Node<T>;
      } else if (child.children) {
        try {
          return findChild(child, predicate, nodeType);
        } catch {
          continue;
        }
      }
    }
  }

  throw new Error(`No child of ${n.name} matches the predicate`);
}
