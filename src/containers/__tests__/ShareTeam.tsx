import React from "react";
import { rest } from "msw";
import { waitForElementToBeRemoved } from "@testing-library/dom";

import { render, screen, fireEvent, waitFor } from "../../test/appTestUtils";

import ShareTeam from "../ShareTeam";
import * as shareTeamDB from "../../test/data/shareTeam";
import { server } from "../../setupTests";

interface IRenderProps {
  shareLink?: any;
}

function renderShareTeam({ shareLink }: IRenderProps = {}) {
  if (shareLink === undefined) {
    shareLink = shareTeamDB.create();
  }

  const utils = render(<ShareTeam positions={[{ x: 1, y: 1 }]} showNames />);

  return {
    ...utils,
    shareLink,
  };
}

describe("ShareTeam", () => {
  test("when click on share team button, display a modal and the share team form should appear with the correct share url/link and image", async () => {
    const imageURL = "http://imageURL.com";

    // Mock URL createObjectURL
    global.URL.createObjectURL = jest.fn(() => imageURL);
    global.Image = class Image2 extends Image {
      constructor() {
        super();
        setTimeout(() => {
          if (this.onload) {
            this.onload(new Event("event"));
          }
        }, 100);
      }
    };

    const { shareLink } = renderShareTeam();

    // Click on the share team button
    const shareTeamBtn = screen.getByText(/share your team/i);
    fireEvent.click(shareTeamBtn);

    // Check that the correct modal appears
    screen.getByTestId("share-team-modal");

    // Check that the form and the link are displayed
    const shareInput = (await screen.findByTestId(
      "share-team-input"
    )) as HTMLInputElement;
    expect(shareInput.value).toEqual(`http://localhost/share/${shareLink.id}`);

    // Initialy it displays the fallback image
    const image = await screen.findByTestId("share-team-image");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/262x400");

    // Check that the correct image is displayed
    await waitFor(() => {
      const image = screen.getByTestId("share-team-image");
      expect(image).toHaveAttribute("src", imageURL);
    });
  });

  test("when the image fails to load, display an error message and a fallback broken image", async () => {
    const imageURL = "http://imageURL.com";
    // Mock URL createObjectURL
    global.URL.createObjectURL = jest.fn(() => imageURL);

    await renderShareTeam();

    // Click on the share team button
    const shareTeamBtn = screen.getByText(/share your team/i);
    fireEvent.click(shareTeamBtn);

    // Check that the correct modal appears
    screen.getByTestId("share-team-modal");

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(/loading/i));

    // Check that the placeholder image is displayed
    const image = await screen.findByTestId("share-team-image");
    expect(image).toMatchInlineSnapshot(`
      <img
        class="chakra-image__placeholder css-11kgfqa"
        data-testid="share-team-image"
        src="https://via.placeholder.com/262x400"
      />
    `);
  });

  test("when the share link creations fails, display an error message", async () => {
    const handler = rest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/image`,
      (_req, res, ctx) => {
        return res(ctx.status(500));
      }
    );

    server.use(handler);

    renderShareTeam();

    // Click on the share team button
    const shareTeamBtn = screen.getByText(/share your team/i);
    fireEvent.click(shareTeamBtn);

    await screen.findByText(
      /There was an error generating the image/i,
      undefined,
      { timeout: 5000, interval: 1000 }
    );
  });
});
