/** Splits an array by a predicate, returning the groups in the between the matching elements */
export function splitBy<A>(arr: Array<A>, predicate: (a: A) => boolean): Array<Array<A>> {
  return arr.reduce(
    (groups, a) => {
      if (predicate(a)) {
        groups.push([]);
      } else {
        groups[groups.length - 1].push(a);
      }
      return groups;
    },
    [[]] as Array<Array<A>>
  );
}
