import React from "react";

import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  within,
  RenderResult,
} from "../../test/appTestUtils";
import TeamLayout from "../TeamLayout";
import * as layoutsDB from "../../test/data/layouts";
import { DndContextProvider } from "../../contexts/dnd";

const noop = () => {};

function renderTeamLayout(): RenderResult {
  layoutsDB.reset();
  return render(
    <DndContextProvider>
      <TeamLayout onChange={noop} />
    </DndContextProvider>
  );
}

describe("TeamLayout", () => {
  test.skip("show layouts separated by defaults and custom (user's layouts) and sorted by created date", async () => {
    renderTeamLayout();

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

  test("delete layout", async () => {
    renderTeamLayout();

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check the current user's layouts
    const customLayoutsContent = screen
      .getAllByTestId("custom-layout")
      .map((position) => position.textContent);
    expect(customLayoutsContent).toMatchInlineSnapshot(`
      Array [
        "custom2",
        "custom3",
        "custom1",
      ]
    `);

    // We are going to delete `custom3` layout, so here we grab the wrapper in
    // order to get its delete button
    const layoutWrapper = screen.getByTestId((id, el) => {
      return (
        /custom-layout/i.test(id) &&
        (el as HTMLElement).textContent === "custom3"
      );
    });
    const utils = within(layoutWrapper);

    // Click on delete the `custom3` layout
    const deleteCustomBtn = utils.getByTestId("remove-layout-btn");
    fireEvent.click(deleteCustomBtn);

    // Confirm the delete action
    const confirmBtn = screen.getByText(/do it!/i);
    fireEvent.click(confirmBtn);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Remove layout custom3/i)
    );

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check the new layouts
    const customLayoutsContentAgain = screen
      .getAllByTestId("custom-layout")
      .map((position) => position.textContent);
    expect(customLayoutsContentAgain).toMatchInlineSnapshot(`
      Array [
        "custom2",
        "custom1",
      ]
    `);
  });

  describe("add new layout", () => {
    test("(happy path) complete the fields and create the layout", async () => {
      renderTeamLayout();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in New layout button
      const newButton = screen.getByTestId("new-layout-button");
      fireEvent.click(newButton);

      // Complete fields
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, {
        target: {
          value: "test",
        },
      });

      // Click on submit button
      const submitButton = screen.getByTestId("new-layout-submit-button");
      fireEvent.click(submitButton);

      // Wait for saving process
      await waitForElementToBeRemoved(submitButton);

      await screen.findByLabelText(/test/i);

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

    test("missing required fields should show error messages and deny creating a new layout", async () => {
      renderTeamLayout();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in new layout button
      const newButton = screen.getByTestId("new-layout-button");
      fireEvent.click(newButton);

      // Click on submit button
      const submitButton = screen.getByTestId("new-layout-submit-button");
      fireEvent.click(submitButton);

      // Wait for saving process
      await waitFor(() => {
        // Should show an error message on the required field
        screen.getByText(/required/i);
      });
    });

    test("click cancel and no new layout is added or removed", async () => {
      renderTeamLayout();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in new layout button
      const newButton = screen.getByTestId("new-layout-button");
      fireEvent.click(newButton);

      // Click on cancel button
      const cancelButton = screen.getByTestId("new-layout-cancel-button");
      fireEvent.click(cancelButton);

      // All the user's layouts are listed
      const customLayoutsContent = screen
        .getAllByTestId("custom-layout")
        .map((position) => position.textContent);
      expect(customLayoutsContent).toMatchInlineSnapshot(`
        Array [
          "custom2",
          "custom3",
          "custom1",
        ]
      `);
    });

    test("change size and save the new layout", async () => {
      renderTeamLayout();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in new layout button
      const newButton = screen.getByTestId("new-layout-button");
      fireEvent.click(newButton);

      // Assign a layout name
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, {
        target: {
          value: "test",
        },
      });

      // Check that we have the default number of positions displayed
      const oldPositions = screen.getAllByTestId(/position/i);
      expect(oldPositions).toHaveLength(11);

      // Change size to 5
      const sizeInput = screen.getByLabelText(/size/i);
      fireEvent.change(sizeInput, {
        target: {
          value: 5,
        },
      });

      // Check that we have 5 positions displayed
      const positions = screen.getAllByTestId(/position/i);
      expect(positions).toHaveLength(5);
    });
  });
});
