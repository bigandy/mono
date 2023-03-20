import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";

const withLayout = (Story: any, context: any) => {
  const { scheme } = context.globals;

  const LightTheme = () => (
    <div className="color-scheme--light">
      <Story />
    </div>
  );

  const DarkTheme = () => (
    <div className="color-scheme--dark">
      <Story />
    </div>
  );

  if (scheme === "dark") {
    return <DarkTheme />;
  }

  if (scheme === "light") {
    return <LightTheme />;
  }

  return (
    <div>
      <LightTheme />
      <DarkTheme />
    </div>
  );
};

const meta = {
  title: "Examples/Avatar",
  component: Avatar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [withLayout],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
