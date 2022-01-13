import { LocalizedString } from "./LocalizedString";

type ReactChild = React.ReactElement<unknown> | LocalizedString;

interface ChildrenArray extends Array<Children> {}

type ReactFragment = ChildrenArray;

export type Children = ReactChild | ReactFragment | boolean | null | undefined;
