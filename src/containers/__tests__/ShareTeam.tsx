import React from "react";

import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "../../test/appTestUtils";

import ShareTeam from "../ShareTeam";
import * as shareTeamDB from "../../test/data/shareTeam";

interface IRenderProps {
  shareLink?: any;
}

async function renderShareTeam({ shareLink }: IRenderProps = {}) {
  if (shareLink === undefined) {
    shareLink = shareTeamDB.create();
  }

  const utils = render(<ShareTeam positions={[{ x: 1, y: 1 }]} />);

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
    const shareInput = (await screen.findByTestId(
      "share-team-input"
    )) as HTMLInputElement;
    expect(shareInput.value).toEqual(`http://localhost/share/${shareLink.id}`);

    // Click again on the share team button
    const newShareLink = shareTeamDB.create();
    fireEvent.click(shareTeamBtn);

    // // Check that the link has changed its id
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    expect(shareInput.value).toEqual(
      `http://localhost/share/${newShareLink.id}`
    );
  });
});
