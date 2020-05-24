import React from "react";

import { render, screen, waitFor, fireEvent } from "../../test/appTestUtils";

import ShareTeam from "../ShareTeam";
import * as shareTeamDB from "../../test/data/shareTeam";

interface IRenderProps {
  shareLink?: any;
}

async function renderShareTeam({ shareLink }: IRenderProps = {}) {
  if (shareLink === undefined) {
    shareLink = shareTeamDB.create();
  }

  const utils = render(<ShareTeam positions={[]} />);

  return {
    ...utils,
    shareLink,
  };
}

describe("ShareTeam", () => {
  test("when click on share team button, the share team form should appear with the correct share url/link", async () => {
    const { shareLink } = await renderShareTeam();

    // Click on the share team button
    const shareTeamBtn = screen.getByText(/share your team/i);
    fireEvent.click(shareTeamBtn);

    // Check that the form and the link are displayed
    const shareInput = await screen.findByTestId("share-team-input");
    expect(shareInput.getElementsByTagName("input")[0].value).toEqual(
      `http://localhost/share/${shareLink.id}`
    );

    // Click again on the share team button
    const newShareLink = shareTeamDB.create();
    fireEvent.click(shareTeamBtn);

    // Check that the link has changed its id
    await waitFor(() => expect(shareTeamBtn).not.toHaveClass("loading"));
    expect(shareInput.getElementsByTagName("input")[0].value).toEqual(
      `http://localhost/share/${newShareLink.id}`
    );
  });
});
