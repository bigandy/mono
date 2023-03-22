import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import { expect } from "@storybook/jest";

import { Page } from ".";

const meta = {
  title: "Example/Page",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  play: async ({ canvasElement }) => {
    const titleText = await canvasElement.querySelector("#title")?.textContent;

    expect(titleText).toEqual("You are now logged out");
  },
};

// More on interaction testing: https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("logged in test", async () => {
      const loginButton = await canvas.getByRole("button", {
        name: /Log in/i,
      });
      await userEvent.click(loginButton);

      const titleText = await canvasElement.querySelector("#title")
        ?.textContent;
      expect(titleText).toEqual("You are now logged in!");
    });

    await step("Logout Test", async () => {
      // Log out again
      const logoutButton = await canvas.getByRole("button", {
        name: /Log out/i,
      });
      await userEvent.click(logoutButton);
      const titleText = await canvasElement.querySelector("#title")
        ?.textContent;

      expect(titleText).toEqual("You are now logged out");
    });
  },
};
