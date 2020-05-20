import React, { useState } from "react";
import { Button, Form, Divider } from "semantic-ui-react";

import { IPosition } from "../../containers/MakeTeam/types";
import useCreateShareTeam from "../../graphql/mutations/useCreateShareTeam";
import ExportForm from "./ExportForm";

interface IProps {
  positions: Array<IPosition>;
  onShowNamesChange: () => void;
}

export default function ShareTeam({ positions, onShowNamesChange }: IProps) {
  const [link, setLink] = useState("");

  const [createShareTeam, { status }] = useCreateShareTeam();

  async function handleClick() {
    try {
      const { data } = await createShareTeam({ name: "test", positions });
      setLink(`${window.location.origin}/share/${data.createShareLink.id}`);
    } catch (e) {
      // TODO: display error
    }
  }

  return (
    <Form>
      <Form.Field>
        <Button positive onClick={handleClick} loading={status === "loading"}>
          Share your team!
        </Button>
      </Form.Field>
      {link && (
        <>
          <Divider />
          <Form.Field>
            <ExportForm
              shareLink={link}
              onShowNamesChange={onShowNamesChange}
            />
          </Form.Field>
          <Divider />
        </>
      )}
    </Form>
  );
}
