import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import MakeTeam from "../MakeTeam";

describe("MakeTeam", () => {
  test("on first render, the layouts and select the first one by default", async () => {
    const { debug } = render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i), {
      timeout: 4000,
    });

    // TODO
    debug();
  });

  test("when the layout is changed, the new positions display on the field and all the players go back to the Roster", () => {
    //
  });

  test("when reset button is clicked on the Roster, all the positions are cleared and the players go back to the Roster", () => {
    //
  });

  test("when click on a player in the Roster, it has to occupied the first available position from bottom to top", async () => {
    const { debug } = render(<MakeTeam />);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i), {
      timeout: 4000,
    });

    // TODO
    // debug();
  });

  test("when click on a player in the Roster and all the positions are completed, nothing should happen", () => {
    //
  });

  test("a player can be dragged and dropped from the Roster into an empty position", () => {
    //
  });

  test("a player can be dragged and dropped from the Roster into an occupied position, putting the last one back to the Roster", () => {
    //
  });
});
