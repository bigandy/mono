import type { Meta, StoryObj } from "@storybook/react";
import { Box } from ".";
import { ResizerDecorator } from "@/decorators/ResizerDecorator";

const meta = {
  title: "Examples/Box",
  component: Box,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [ResizerDecorator],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "An h1 title",
  },
};
