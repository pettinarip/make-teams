import React from "react";

import {
  renderWithAuth as render,
  screen,
  waitFor,
  fireEvent,
  dragAndDrop,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import MakeTeam from "../MakeTeam";

describe("MakeTeam", () => {
  test("renders the main components", async () => {
    render(<MakeTeam />);

    await waitFor(() => {
      expect(screen.queryAllByTestId("position").length).toEqual(11);
    });

    screen.getByText(/layout/i);
    screen.getByText(/roster/i);
    screen.getByTestId("field");
    screen.getByTestId("share-team-btn");
  });

  test("on first load, renders the first user's layout by default", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));
    await waitFor(() => {
      expect(screen.queryAllByTestId("position").length).toEqual(11);
    });

    // First user's layout in the list is selected by default
    const layouts = screen.getAllByTestId("custom-layout");
    expect(layouts[0].getElementsByTagName("input")[0].checked).toBeTruthy();

    // // Display the correct positions on the Field
    const positions = screen.getAllByTestId("position");
    expect(positions.length).toEqual(11);
  });

  test("on first load, renders the first default layout by default if there is no custom layout", async () => {
    // TODO
  });

  test("when the layout is changed, the new positions are displayed on the field and all the players go back to the Roster", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Display the correct positions on the Field
    const positions = screen.getAllByTestId("position");
    expect(positions.length).toEqual(11);

    // Click on the second layout listed
    const layout = screen.getByLabelText("4-4-2");
    fireEvent.click(layout);

    // Check that new positions has changed
    const newPositions = screen.getAllByTestId("position");
    expect(newPositions.length).toEqual(1);
  });

  test("when reset button is clicked on the Roster, all the positions are cleared and the players go back to the Roster", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check the number of players we have initialy
    const playersInRoster = screen.getAllByTestId("player");
    expect(playersInRoster.length).toEqual(13);

    // Click on 3 players to populate 3 positions
    const positions = screen.getAllByTestId("position");
    fireEvent.click(screen.getByText(/test, test/i));
    fireEvent.click(positions[0]);
    fireEvent.click(screen.getByText(/test2, test/i));
    fireEvent.click(positions[1]);
    fireEvent.click(screen.getByText(/test3, test/i));
    fireEvent.click(positions[2]);

    // Check that we have 3 less players in the Roster and 3 positions occupied
    expect(screen.getAllByTestId("player").length).toEqual(10);
    const positionsNames = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(positionsNames).toMatchInlineSnapshot(`
      Array [
        "TT1",
        "TT2",
        "TT3",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Click on the Reset button
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);

    // Check that all the positions are emptied and the Roster has all the
    // players
    expect(screen.getAllByTestId("player").length).toEqual(13);
    const newpositions = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(newpositions).toMatchInlineSnapshot(`
      Array [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);
  });

  test("a player can be dragged and dropped from the Roster into an empty position", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Drag the player named Pablo Pettinari into the first position
    const player = screen.getByText(/pablo/i);
    const positions = screen.getAllByTestId(/position/i);
    dragAndDrop(player, positions[0]);

    const newPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(newPositions).toMatchInlineSnapshot(`
      Array [
        "PP5",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);
  });

  test("a player can be dragged and dropped from the Roster into an occupied position, putting the last one back to the Roster", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Assign totti player to the first position
    const positions = screen.getAllByTestId("position");
    const totti = screen.getByText(/totti/i);
    fireEvent.click(totti);
    fireEvent.click(positions[0]);

    const positionsNames = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(positionsNames).toMatchInlineSnapshot(`
      Array [
        "TF10",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Assign pablo player to the same position
    const pablo = screen.getByText(/pablo/i);
    const firstPosition = screen.getAllByTestId(/position/i)[0];
    dragAndDrop(pablo, firstPosition);

    // Check that pablo is the new player in the first position
    const newPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(newPositions).toMatchInlineSnapshot(`
      Array [
        "PP5",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Check that totti return to the roster
    const roster = screen
      .getAllByTestId("player")
      .map((player) => player.textContent);
    expect(roster).toMatchInlineSnapshot(`
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

  // FIXME: now we have to test it against the remove button each position has
  test.skip("clicking in an ocuppied position, unassign it and put it back to the Roster", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Drag the player named Pablo Pettinari into the first position
    const player = screen.getByText(/pablo/i);
    let positions = screen.getAllByTestId(/position/i);
    dragAndDrop(player, positions[0]);

    const oldPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(oldPositions).toMatchInlineSnapshot(`
      Array [
        "PP5",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Click on the occupied position
    positions = screen.getAllByTestId(/position/i);
    fireEvent.click(positions[0]);

    const newPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(newPositions).toMatchInlineSnapshot(`
      Array [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Check that the player is back in the Roster
    const roster = screen
      .getAllByTestId("player")
      .map((player) => player.textContent);
    expect(roster).toMatchInlineSnapshot(`
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
      ]
    `);
  });

  test("an empty position can not be dragged", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Drag the player named Pablo Pettinari into the first position
    const player = screen.getByText(/pablo/i);
    const positions = screen.getAllByTestId(/position/i);
    dragAndDrop(player, positions[0]);

    // Check what we have
    const oldPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(oldPositions).toMatchInlineSnapshot(`
      Array [
        "PP5",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Try to drag an empty position (the 2nd) into the previous
    dragAndDrop(positions[1], positions[0]);

    // Nothing should have changed
    const newPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(newPositions).toMatchInlineSnapshot(`
      Array [
        "PP5",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);
  });

  test("when 'show names' toggle is on, players names dispalys", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Assign totti player to the first position
    const positions = screen.getAllByTestId("position");
    const totti = screen.getByText(/totti/i);
    fireEvent.click(totti);
    fireEvent.click(positions[0]);

    const positionsNames = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(positionsNames).toMatchInlineSnapshot(`
      Array [
        "TF10",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);

    // Turn show names on
    const showNamesToggle = screen.getByLabelText(/show names/i);
    fireEvent.click(showNamesToggle);

    const newPositions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(newPositions).toMatchInlineSnapshot(`
      Array [
        "TF10Totti, Francesco",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
    `);
  });
});
