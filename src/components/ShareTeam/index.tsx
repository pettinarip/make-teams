import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

import { IPosition } from "../../containers/MakeTeam/types";
import useCreateShareTeam from "../../graphql/mutations/useCreateShareTeam";

interface IProps {
  positions: Array<IPosition>;
}

export default function ShareTeam({ positions }: IProps) {
  const [link, setLink] = useState("");
  const [createShareTeam, { status }] = useCreateShareTeam();

  async function handleClick() {
    try {
      const { data } = await createShareTeam({ name: "test", positions });
      setLink(`${window.location.origin}/share/${data.createShareLink.id}`);
    } catch (e) {
      //
    }
  }

  return (
    <>
      <Button positive onClick={handleClick} loading={status === "loading"}>
        Share your team!
      </Button>
      <Input
        action={{
          icon: "copy",
        }}
        defaultValue={link}
        readOnly
      />
    </>
  );
}
