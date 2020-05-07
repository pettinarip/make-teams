import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import MakeTeam from "../MakeTeam";

test("MakeTeam", async () => {
  render(<MakeTeam />);

  await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i), {
    timeout: 4000,
  });

  // TODO
});
