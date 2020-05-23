import React from "react";

import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
  getByTestId,
} from "../../test/appTestUtils";

import ShareTeam from "../ShareTeam";

describe("ShareTeam", () => {
  test("when click on share team button, the share team form should appear with the correct share url/link", async () => {
    const { debug } = render(<ShareTeam positions={[]} />);

    // Click on the share team button
    const shareTeamBtn = screen.getByText(/share your team/i);
    fireEvent.click(shareTeamBtn);

    debug();

    // Check that the form and the link are displayed
    const shareInput = await screen.findByTestId("share-team-input");
    expect(shareInput.nodeValue).toEqual("");

    // Click again on the share team button
    fireEvent.click(shareTeamBtn);

    // Check that the link has changed its id
    await waitFor(() => {});
  });
});
