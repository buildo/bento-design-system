// NOTE(gabro): Adapted from react-keyed-flatten-children, due to lack of ESM build
// Released under the MIT license (https://github.com/grrowl/react-keyed-flatten-children/blob/master/LICENSE)

/* Returns React children into an array, flattening fragments. */
import { ReactNode, ReactElement, Children, isValidElement, cloneElement } from "react";
import { isFragment } from "react-is";

type ReactChild = ReactElement | string | number;

export function flattenChildren(
  children: ReactNode,
  depth: number = 0,
  keys: (string | number)[] = []
): ReactChild[] {
  return Children.toArray(children).reduce((acc: ReactChild[], node, nodeIndex) => {
    if (isFragment(node)) {
      acc.push.apply(
        acc,
        flattenChildren(node.props.children, depth + 1, keys.concat(node.key || nodeIndex))
      );
    } else {
      if (isValidElement(node)) {
        acc.push(
          cloneElement(node, {
            key: keys.concat(String(node.key)).join("."),
          })
        );
      } else if (typeof node === "string" || typeof node === "number") {
        acc.push(node);
      }
    }
    return acc;
  }, []);
}
