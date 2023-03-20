import type { Preview } from "@storybook/react";

import "../src/color-scheme.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const globalTypes = {
  scheme: {
    name: "Scheme",
    description: "Select light or dark theme",
    defaltValue: "both",
    toolbar: {
      icon: "mirror",
      items: ["light", "dark", "both"],
      dynamicTitle: true,
    },
  },
};
