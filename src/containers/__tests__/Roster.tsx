import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  fireEvent,
  renderWithAuth as render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "../../test/appTestUtils";
import * as playersDB from "../../test/data/players";

import Roster from "../Roster";

const noop = () => {};

function renderRoster() {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Roster
        onPlayerClick={noop}
        onPlayerDropInPosition={noop}
        onResetClick={noop}
        usedPlayersIds={[]}
      />
    </DndProvider>
  );
}

describe("Roster", () => {
  afterEach(() => {
    playersDB.reset();
  });

  describe("Create player", () => {
    test("happy path, complete all fields and save", async () => {
      renderRoster();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in New player button
      const newButton = screen.getByText("New");
      fireEvent.click(newButton);

      // Complete fields
      const firstNameInput = screen.getByLabelText(/First name/i);
      fireEvent.change(firstNameInput, {
        target: {
          value: "newFirstName",
        },
      });

      const lastNameInput = screen.getByLabelText(/Last name/i);
      fireEvent.change(lastNameInput, {
        target: {
          value: "last",
        },
      });

      const genderSelect = screen.getByLabelText(/Gender/i);
      userEvent.selectOptions(genderSelect, "male");

      const numberInput = screen.getByLabelText(/Number/i);
      fireEvent.change(numberInput, {
        target: {
          value: "99",
        },
      });

      const positionRadio = screen.getByLabelText(/Mid/i);
      fireEvent.click(positionRadio);

      // Submit form
      const submitButton = screen.getByTestId("player-submit-button");
      fireEvent.click(submitButton);

      // Wait for saving process
      await screen.findByText(/newFirstName/i, undefined, {
        timeout: 5000,
        interval: 1000,
      });

      // Check that the new player is at the bottom of the roster list
      const players = screen
        .getAllByTestId("player")
        .map((position) => position.textContent);
      expect(players).toMatchInlineSnapshot(`
        Array [
          "PCPuyol, Charles6Defender",
          "TFTotti, Francesco10Defender",
          "PRPalacios, Rodrigo14Defender",
          "PPPettinari, Pablo5Defender",
          "TTTest, Test1Defender",
          "TTTest2, Test2Defender",
          "TTTest3, Test3Defender",
          "TTTest4, Test4Defender",
          "TTTest5, Test7Defender",
          "TTTest6, Test8Defender",
          "TTTest7, Test9Defender",
          "TTTest8, Test11Defender",
          "TTTest9, Test12Defender",
          "lnlast, newFirstName99Defender",
        ]
      `);
    });

    test("missing fields, should display required errors", async () => {
      renderRoster();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Click in New player button
      const newButton = screen.getByText("New");
      fireEvent.click(newButton);

      // Submit form
      const submitButton = screen.getByTestId("player-submit-button");
      fireEvent.click(submitButton);

      const requiredFields = await screen.findAllByText(/required/i);
      expect(requiredFields.map((position) => position.textContent))
        .toMatchInlineSnapshot(`
        Array [
          "Required",
          "Required",
          "Required",
        ]
      `);
    });
  });

  describe("Edit player", () => {
    test("happy path, modify a field and save", async () => {
      renderRoster();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Hover on a player
      const playerItem = screen.getByText(/pablo/i).closest("li");
      const utils = within(playerItem!);

      // Click on the edit button
      const editButton = utils.getByTestId("edit-player-button");
      fireEvent.click(editButton);

      // Leave a required field empty
      const firstNameInput = screen.getByLabelText(/First name/i);
      fireEvent.change(firstNameInput, {
        target: {
          value: "newname",
        },
      });

      // Submit form
      const submitButton = screen.getByTestId("player-submit-button");
      fireEvent.click(submitButton);

      // Wait for saving process, modal has been closed
      await waitForElementToBeRemoved(() => {
        // console.log(screen.queryByText(/Modify player/i));
        return screen.queryByText(/Modify player/i);
      });

      await screen.findByLabelText(/newname/i);

      const players = screen
        .getAllByTestId("player")
        .map((position) => position.textContent);
      expect(players).toMatchInlineSnapshot(`
        Array [
          "PCPuyol, Charles6Defender",
          "TFTotti, Francesco10Defender",
          "PRPalacios, Rodrigo14Defender",
          "PnPettinari, newname5Defender",
          "TTTest, Test1Defender",
          "TTTest2, Test2Defender",
          "TTTest3, Test3Defender",
          "TTTest4, Test4Defender",
          "TTTest5, Test7Defender",
          "TTTest6, Test8Defender",
          "TTTest7, Test9Defender",
          "TTTest8, Test11Defender",
          "TTTest9, Test12Defender",
        ]
      `);
    });

    test("missing fields, should display required errors", async () => {
      renderRoster();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Hover on a player
      const playerItem = screen.getByText(/pablo/i).closest("li");
      const utils = within(playerItem!);

      // Click on the edit button
      const editButton = utils.getByTestId("edit-player-button");
      fireEvent.click(editButton);

      // Leave a required field empty
      const firstNameInput = screen.getByLabelText(/First name/i);
      fireEvent.change(firstNameInput, {
        target: {
          value: "",
        },
      });

      // Submit form
      const submitButton = screen.getByTestId("player-submit-button");
      fireEvent.click(submitButton);

      const requiredFields = await screen.findAllByText(/required/i);
      expect(requiredFields.map((position) => position.textContent))
        .toMatchInlineSnapshot(`
        Array [
          "Required",
        ]
      `);
    });
  });

  describe("Delete player", () => {
    test("happy path", async () => {
      renderRoster();

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      // Hover on a player
      const playerItem = screen.getByText(/pablo/i).closest("li");
      const utils = within(playerItem!);

      // Click on the delete button
      const deleteButton = utils.getByTestId("delete-player-button");
      fireEvent.click(deleteButton);

      // Submit form
      const submitButton = screen.getByText(/do it/i);
      fireEvent.click(submitButton);

      await waitForElementToBeRemoved(screen.queryByText(/pablo/i));
      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId(/loading/i)
      );

      const players = screen
        .getAllByTestId("player")
        .map((position) => position.textContent);
      expect(players).toMatchInlineSnapshot(`
        Array [
          "PCPuyol, Charles6Defender",
          "TFTotti, Francesco10Defender",
          "PRPalacios, Rodrigo14Defender",
          "TTTest, Test1Defender",
          "TTTest2, Test2Defender",
          "TTTest3, Test3Defender",
          "TTTest4, Test4Defender",
          "TTTest5, Test7Defender",
          "TTTest6, Test8Defender",
          "TTTest7, Test9Defender",
          "TTTest8, Test11Defender",
          "TTTest9, Test12Defender",
        ]
      `);
    });
  });
});
