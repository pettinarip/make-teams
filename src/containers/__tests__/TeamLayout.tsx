import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "../../test/appTestUtils";

import TeamLayout from "../TeamLayout";

const noop = () => {};

describe("TeamLayout", () => {
  test("show layouts separated by defaults and custom (user's layouts) and sorted by created date", async () => {
    render(<TeamLayout onChange={noop} />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check that the default layouts are displayed correctly in order
    const layouts = screen
      .getAllByTestId("layout")
      .map((position) => position.textContent);
    expect(layouts).toMatchInlineSnapshot(`
      Array [
        "4-3-3",
        "4-4-2",
        "4-4-2 (new)",
      ]
    `);

    // Check that the user's layouts are displayed correctly in order
    const customLayouts = screen
      .getAllByTestId("custom-layout")
      .map((position) => position.textContent);
    expect(customLayouts).toMatchInlineSnapshot(`
      Array [
        "custom2",
        "custom3",
        "custom1",
      ]
    `);
  });

  describe("add new layout", () => {
    test("(happy path) complete the fields and create the layout", async () => {
      const { getByTestId } = render(
        <DndProvider backend={HTML5Backend}>
          <TeamLayout onChange={noop} />
        </DndProvider>
      );

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in New layout button
      const newButton = getByTestId("new-layout-button");
      fireEvent.click(newButton);

      // Complete fields
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, {
        target: {
          value: "test",
        },
      });

      // Click on submit button
      const submitButton = getByTestId("new-layout-submit-button");
      fireEvent.click(submitButton);

      // Wait for saving process
      await waitForElementToBeRemoved(submitButton);

      // Check that the new layout is at the bottom of the custom layouts list
      const layouts = screen
        .getAllByTestId("custom-layout")
        .map((position) => position.textContent);
      expect(layouts).toMatchInlineSnapshot(`
        Array [
          "custom2",
          "custom3",
          "custom1",
          "test",
        ]
      `);
    });

    test("missing required fields should show error messages and denied creating a new layout", async () => {
      const { getByTestId } = render(
        <DndProvider backend={HTML5Backend}>
          <TeamLayout onChange={noop} />
        </DndProvider>
      );

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in New layout button
      const newButton = getByTestId("new-layout-button");
      fireEvent.click(newButton);

      // Click on submit button
      const submitButton = getByTestId("new-layout-submit-button");
      fireEvent.click(submitButton);

      // Wait for saving process
      await waitFor(() => {
        // Should show an error message on the required field
        screen.getByText(/required/i);
      });
    });
  });
});
