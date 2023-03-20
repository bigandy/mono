import type { Meta, StoryObj } from "@storybook/react";
import ArticleCard from ".";

const meta = {
  title: "Site/ArticleCard",
  component: ArticleCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Weeknote 2023 #1 - Re-imagining my site",
    href: "#",
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "Weeknote 2023 #1 - Re-imagining my site. A really long time in the making and etc",
    href: "#",
  },
};
