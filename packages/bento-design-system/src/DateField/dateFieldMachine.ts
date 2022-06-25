import { FocusedInput } from "@datepicker-react/hooks";
import { createMachine, assign } from "xstate";

const initialContext = {
  focusedInput: null as FocusedInput,
};

export const dateFieldMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBECGAXMAxAlmANhAHQBOYqEA9gHb4CeAxLGOgIIDG6OAbmIqAAdKsHFxr8QAD0QBaAExyAbEQAsigKwAOdQAZ1c9QGZFhgIzqANCDqJTO00U0B2U07mGnKgJyalJgL7+VmiYuATEZBQ09EwsyDiwqABG+JASQiJi1BLSCDIqCo6KptpOhl4q6upOiopWNnnqRLpexYYq3h7a+oHBGNh4hESonDxgRABmlOwArrBE1JToWNNzkLHLq8wQ6cKiOOJIUojlTkTu6iUdJXL1J6YOeg8KhqcKVb0gIQPhw6O8ky2gNm2w2ADklisQWkjhl9odQLlimclDoOuovKYfJoVIY7ghXjpmpcdL5aqYTCYnJ9vmEhiMuACIP0AAo4dgAazAJAAsmBqDMiOx8MJ1pQBPzvmzOdzdpkDtkjrkHk4mnIvJi7IovOpigp8XJNModE4dIo9IpnCpVa0af06cQGWMiMzMNKubz+YLxfyGMLRVL2R65fDFYjEJpjM0nJjtZiYzovE4DUaiCazaYzKY5E4yka7aFBo7-mANgAlchUWgNQR7LI5WReOREHXmmr2ezqXH4mRNFrFDpyFS+DXuAs-ekljbxRIpGG1+UI455cpNbPoxRlfSk634wz6IimAp6XOtHQ5rzjh0uhLJVIQDYcRl8WF1hUNvJKM4mrTOAwxjFIwNYpozRTQkxqAxOkCIIQEWCA4AkWki1IStohrEA4XrJVZCHFQiHNRRrRcbVDE0I1LGsWRszTRNFAMNFDENc8yKvFCnQBKYQQWSEtnnTC3yXXJKnwzwKQqXR2hNFR8QpM5MwMI93ENFo2N+Djxi4uZgTWHZX0XMNl0uZtc0tdUNE0M16Pxa5aKNFQrkqZxajUydnx0+B9NDD8PEMc590cm58QqQ8mN0DQ5EY3VXOLdzXTAd1uT5AUhRFbYQ2w8MEAg1RdXJVwXAeSiGnExxPGKHUm08Iw5Biv44tZIMkq9IgfUMrD3xw7LfFUHU3FNejSluKiEFxLxDzKYwEz0exDDqjSXUamVPQFDLOqyzQaOqWMNVcLxE2TEbWjKtQHnInRCXPeaSyIAALBJ0EoEgMI6oTEAUfCcWzMxfOMAxitsZwiHabRfNzGovDm2DkPUks1rehBIqJL73EzSb6KqA0HAU4cXAhtQtChvpC1+CBbznPSF28rreyBsjGNVB5MzqEaZBonQ6Ks3MulqaloftIt4cM3IZGKBx6dxRmHmMHttFo1pDFJVwSiYlQYP8IA */
  createMachine(
    {
      context: initialContext,
      tsTypes: {} as import("./dateFieldMachine.typegen").Typegen0,
      schema: {
        context: {} as typeof initialContext,
        events: {} as
          | { type: "setActive" }
          | { type: "setDisabled" }
          | { type: "setReadonly" }
          | { type: "setFocused"; focusedInput: NonNullable<FocusedInput> }
          | { type: "setNotFocused" }
          | { type: "closeDatePicker" }
          | { type: "openDatePicker" },
      },
      id: "DateField",
      initial: "active",
      states: {
        readonly: {
          on: {
            setActive: {
              target: "active",
            },
            setDisabled: {
              target: "disabled",
            },
          },
        },
        active: {
          type: "parallel",
          states: {
            focus: {
              initial: "notFocused",
              states: {
                notFocused: {
                  on: {
                    setFocused: {
                      actions: "setFocusedInput",
                      target: "focused",
                    },
                  },
                },
                focused: {
                  on: {
                    setNotFocused: {
                      target: "notFocused",
                    },
                  },
                },
              },
            },
            datePickerMenu: {
              initial: "closed",
              states: {
                closed: {
                  on: {
                    openDatePicker: {
                      target: "open",
                    },
                  },
                },
                open: {
                  on: {
                    closeDatePicker: {
                      target: "closed",
                    },
                  },
                },
              },
            },
          },
          on: {
            setReadonly: {
              target: "readonly",
            },
            setDisabled: {
              target: "disabled",
            },
          },
        },
        disabled: {
          on: {
            setActive: {
              target: "active",
            },
          },
        },
      },
    },
    {
      actions: {
        setFocusedInput: assign((_context, { focusedInput }) => ({
          focusedInput: focusedInput,
        })),
      },
    }
  );
