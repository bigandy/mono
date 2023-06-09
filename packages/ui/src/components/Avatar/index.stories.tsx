import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";

import { WithTheme } from "@/decorators/WithTheme";

const meta = {
  title: "Examples/Avatar",
  component: Avatar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [WithTheme],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
