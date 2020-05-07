import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import TeamLayout from "../TeamLayout";

const noop = () => {};

test("TeamLayout", async () => {
  render(<TeamLayout onChange={noop} />);

  await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i), {
    timeout: 4000,
  });

  // TODO
});
