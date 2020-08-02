import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

const noop = () => {};

function renderTeamLayout(): RenderResult {
  layoutsDB.reset();
  return render(
    <DndProvider backend={HTML5Backend}>
      <TeamLayout onChange={noop} />
    </DndProvider>
  );
}

describe("TeamLayout", () => {
  test("show layouts separated by defaults and custom (user's layouts) and sorted by created date", async () => {
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
    const { getByTestId } = renderTeamLayout();

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
    const layoutWrapper = getByTestId((id, el) => {
      return /custom-layout/i.test(id) && el.textContent === "custom3";
    });
    const utils = within(layoutWrapper);

    // Click on delete the `custom3` layout
    const deleteCustomBtn = utils.getByTestId("remove-layout-btn");
    fireEvent.click(deleteCustomBtn);

    // Confirm the delete action
    const confirmBtn = screen.getByText(/do it!/i);
    fireEvent.click(confirmBtn);

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
      const { getByTestId } = renderTeamLayout();

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

    test("missing required fields should show error messages and deny creating a new layout", async () => {
      const { getByTestId } = renderTeamLayout();

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

    test("click cancel and no new layout should be added", async () => {
      // TODO
    });

    test("change size and save the new layout", async () => {
      // TODO
    });

    test("move positions should snap them within intervals of 5%", async () => {
      // TODO
    });
  });
});
