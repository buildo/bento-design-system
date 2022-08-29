export type Overwrite<O1 extends object, O2 extends object> = {
  [k in keyof O1]: k extends keyof O2 ? O2[k] : O1[k];
};
