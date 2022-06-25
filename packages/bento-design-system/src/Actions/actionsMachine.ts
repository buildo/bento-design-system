import { createMachine } from "xstate";

export const actionsMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEEDGAXAlgewHawDoAnMAQwgE8BiPABRNniRAAdtZMs9FQAPRAEwAGAKwEAbCPHiAnCIAcAZgAs8kQEYRAGhAVEAWnUEA7MfGKpSmcqFCBI0WEMiAvi51ou+AgBts5TFwoKgg8MAJAgDdsAGtwzxxvPwCghCjsVFIvAG0hAF0eVnZORML+BE0hAhkBAUV7AUkhGSFJHT0EAWMxB1thOukRRWs3DwxEwlgAV1RUOFgqQrYOLzKDOuMCVqF5IXU9xXVlVWV2wW6CZRk5YxlTeoF1cTd3EFxsCDhChLxCEnIOqBliVuMxyvp7FVjMpxHUZOIri11PJjGcEPpxARerZWvJkZprqMQD8kv4IIEoEtiqswYh1IcscY1LJxOpjOo5DI0dZqmz6bU2VInkSSZMZnNGFSVqVaejJARFPJ4TsRFJlMJxPI0Y0ZFscep9lcRFdjCLxr8pSDcGt0V1lCYYXCEdc9lzdAZbpc1MpjQIWmrni8gA */
  createMachine({
    tsTypes: {} as import("./actionsMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        onPressCallback: { data: void };
      },
    },
    id: "Actions",
    initial: "ready",
    states: {
      ready: {
        on: {
          onPress: {
            target: "loading",
          },
        },
      },
      loading: {
        invoke: {
          src: "onPressCallback",
          onDone: [
            {
              target: "success",
            },
          ],
        },
      },
      success: {
        always: {
          target: "ready",
        },
      },
    },
  });
