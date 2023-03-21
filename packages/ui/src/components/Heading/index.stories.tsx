import type { Meta, StoryObj } from "@storybook/react";
import { Heading, type AllowedTag } from ".";
import { PaddedComponent } from "@/decorators/PaddedComponent";

const meta = {
  title: "Examples/Heading",
  component: Heading,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [PaddedComponent],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

const argTypes = {
  Tag: {
    options: ["h1", "h2", "h3", "h4", "h5", "h6"] as AllowedTag[],
    control: {
      type: "select",
      default: "h1",
    },
  },
};

export const h1: Story = {
  args: {
    children: "An h1 title",
  },
  argTypes: {
    ...argTypes,
    ...{
      Tag: {
        control: {
          default: "h1",
        },
      },
    },
  },
};

export const h2: Story = {
  args: {
    Tag: "h2",
    children: "An h2 title",
  },
  argTypes: {
    ...argTypes,
    ...{
      Tag: {
        control: {
          default: "h2",
        },
      },
    },
  },
};

export const h3: Story = {
  args: {
    Tag: "h3",
    children: "An h3 title",
  },
  argTypes: {
    ...argTypes,
    ...{
      Tag: {
        control: {
          default: "h3",
        },
      },
    },
  },
};

export const h4: Story = {
  args: {
    Tag: "h4",
    children: "An h4 title",
  },
  argTypes: {
    ...argTypes,
    ...{
      Tag: {
        control: {
          default: "h4",
        },
      },
    },
  },
};

export const h5: Story = {
  args: {
    Tag: "h5",
    children: "An h5 title",
  },
  argTypes: {
    ...argTypes,
    ...{
      Tag: {
        control: {
          default: "h5",
        },
      },
    },
  },
};

export const h6: Story = {
  args: {
    Tag: "h6",
    children: "An h6 title",
  },
  argTypes: {
    ...argTypes,
    ...{
      Tag: {
        control: {
          default: "h6",
        },
      },
    },
  },
};
