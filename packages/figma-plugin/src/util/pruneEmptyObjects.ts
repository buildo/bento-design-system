export function pruneEmptyObjects(obj: object): object {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => !isEmpty(v))
      .map(([k, v]) => [k, v === Object(v) ? pruneEmptyObjects(v) : v])
  );
}

function isEmpty(v: unknown): boolean {
  if (!v) {
    return true;
  }

  if (typeof v === "object") {
    return Object.keys(v).length === 0 || Object.values(v).every(isEmpty);
  }

  return false;
}
