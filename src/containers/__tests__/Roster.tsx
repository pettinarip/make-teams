import React from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import Roster from "../Roster";

const noop = () => {};

test("Roster", async () => {
  render(
    <DndProvider backend={Backend}>
      <Roster
        onPlayerClick={noop}
        onPlayerDropInPosition={noop}
        onResetClick={noop}
        usedPlayersIds={[]}
      />
    </DndProvider>
  );

  await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

  // TODO
});
