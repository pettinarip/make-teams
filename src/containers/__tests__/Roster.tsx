import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import Roster from "../Roster";

const noop = () => {};

test("Roster", async () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <Roster
        onPlayerClick={noop}
        onPlayerDropInPosition={noop}
        onResetClick={noop}
        usedPlayersIds={[]}
      />
    </DndProvider>
  );

  // FIXME: don't like these two waits...find a way to use only one
  await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));
  await waitFor(() => {
    expect(screen.getByTestId("roster-buttons")).toBeInTheDocument();
  });

  // TODO
});
