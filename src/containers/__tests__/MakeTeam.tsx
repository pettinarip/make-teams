import React from "react";

import {
  render,
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

  test("when click on a player in the Roster, it has to occupied the first available position from bottom to top", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check that the positions are empty intialy
    const positions = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(positions).toMatchInlineSnapshot(`
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

    // Check the number of players we have initialy
    const playersInRoster = screen.getAllByTestId("player");
    expect(playersInRoster.length).toEqual(13);

    // Click on the player named Pablo Pettinari
    const player = screen.getByText(/pablo/i);
    fireEvent.click(player);

    // Check that it was positioned in the first position available
    const newPlayersInRoster = screen.getAllByTestId("player");
    expect(newPlayersInRoster.length).toEqual(12);
    const newPositions = screen
      .getAllByTestId("position")
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

  test("when reset button is clicked on the Roster, all the positions are cleared and the players go back to the Roster", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check the number of players we have initialy
    const playersInRoster = screen.getAllByTestId("player");
    expect(playersInRoster.length).toEqual(13);

    // Click on 3 players to populate 3 positions
    fireEvent.click(screen.getByText(/test, test/i));
    fireEvent.click(screen.getByText(/test2, test/i));
    fireEvent.click(screen.getByText(/test3, test/i));

    // Check that we have 3 less players in the Roster and 3 positions occupied
    expect(screen.getAllByTestId("player").length).toEqual(10);
    const positions = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(positions).toMatchInlineSnapshot(`
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

  test("when click on a player in the Roster and all the positions are completed, nothing should happen", async () => {
    render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Click on 11 players in the Roster
    screen.getAllByTestId("player").slice(0, 11).forEach(fireEvent.click);

    // Check that all the positions are occupied
    const positions = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(positions).toMatchInlineSnapshot(`
      Array [
        "PC6",
        "TF10",
        "PR14",
        "PP5",
        "TT1",
        "TT2",
        "TT3",
        "TT4",
        "TT7",
        "TT8",
        "TT9",
      ]
    `);

    // Click in one more player in the Roster and check that nothing has changed
    const players = screen.getAllByTestId("player");
    fireEvent.click(players[0]);

    expect(screen.getAllByTestId("player").length).toEqual(2);
    const newPositions = screen
      .getAllByTestId("position")
      .map((position) => position.textContent);
    expect(newPositions).toMatchInlineSnapshot(`
      Array [
        "PC6",
        "TF10",
        "PR14",
        "PP5",
        "TT1",
        "TT2",
        "TT3",
        "TT4",
        "TT7",
        "TT8",
        "TT9",
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
    const totti = screen.getByText(/totti/i);
    fireEvent.click(totti);

    const positions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(positions).toMatchInlineSnapshot(`
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
      .getAllByTestId(/player/i)
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
    const totti = screen.getByText(/totti/i);
    fireEvent.click(totti);

    const positions = screen
      .getAllByTestId(/position/i)
      .map((position) => position.textContent);
    expect(positions).toMatchInlineSnapshot(`
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
