import React, { useState } from "react";
import { Button, Form, Divider } from "semantic-ui-react";

import useCreateShareTeam from "../../graphql/mutations/useCreateShareTeam";
import { IPosition } from "../MakeTeam/types";
import ExportForm from "./ExportForm";

interface IProps {
  positions: Array<IPosition>;
}

export default function ShareTeam({ positions }: IProps) {
  const [link, setLink] = useState("");

  const [createShareTeam, { status }] = useCreateShareTeam();

  async function handleClick() {
    try {
      // TODO: add a name to the share team
      const { data } = await createShareTeam({ name: "test", positions });
      setLink(`${window.location.origin}/share/${data.createShareLink.id}`);
    } catch (e) {
      // TODO: display error
    }
  }

  return (
    <Form>
      <Form.Field>
        <Button
          positive
          onClick={handleClick}
          loading={status === "loading"}
          data-testid="share-team-btn"
        >
          Share your team!
        </Button>
      </Form.Field>
      {link && (
        <>
          <Divider />
          <Form.Field>
            <ExportForm shareLink={link} data-testid="share-team-form" />
          </Form.Field>
          <Divider />
        </>
      )}
    </Form>
  );
}
