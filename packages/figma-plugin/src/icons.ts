// TODO(gabro): this is currently just an experiment
// @ts-ignore
import { TextDecoder } from "fastestsmallesttextencoderdecoder";
import { findComponentInPage } from "./util/findComponent";

function findAllIcons(): ComponentNode[] {
  const { page: iconPage } = findComponentInPage("Icon");
  const iconsSet = iconPage?.findChild((c) => c.name === "Vector") as ComponentSetNode;
  return iconsSet.findAllWithCriteria({ types: ["COMPONENT"] }) ?? [];
}

export default async function exportIcons() {
  figma.parameters.on("input", ({ key, query, result }: ParameterInputEvent) => {
    switch (key) {
      case "iconName":
        const iconNames = findAllIcons().map((c) => c.variantProperties!["Kind"]);
        result.setSuggestions(iconNames.filter((s) => s.includes(query)));
        break;
    }
  });

  figma.on("run", async ({ command, parameters }) => {
    if (command === "src/icons.ts--default") {
      const iconName = parameters!.iconName;
      const svgExport = await findAllIcons()
        .find((c) => c.variantProperties!["Kind"] === iconName)
        ?.exportAsync({
          format: "SVG",
        });
      const svgCode = new TextDecoder().decode(svgExport);

      const svgrRequestBody = JSON.stringify({
        code: svgCode,
        options: {
          jsxRuntime: "automatic",
          typescript: true,
          exportType: "named",
        },
      });

      const html = `<script>
      fetch('https://api.react-svgr.com/api/svgr', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(${svgrRequestBody}),
      }).then(res => res.json()).then(json => {
        parent.postMessage({ pluginMessage: { result: json.output } }, '*')
      }, error => {
        parent.postMessage({ pluginMessage: { error } }, '*')
      })
    </script>`;

      figma.showUI(html, {
        visible: false,
      });

      figma.ui.onmessage = (message) => {
        if (message.result) {
          console.log(message.result);
        } else {
          console.error(message.error);
        }
        figma.closePlugin();
      };
    }
  });
}

export async function svgr(code: string, options = {}) {
  const json = await new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", "https://api.react-svgr.com/api/svgr");
    request.responseType = "text";
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
      console.log("request.response  " + request.response);
      resolve(request.response);
    };

    request.onerror = () => {
      reject(new Error("Network error"));
    };

    request.send(JSON.stringify({ code, options }));
  });

  return json;
}
