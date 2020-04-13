import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

import { IPlayer } from "../../containers/MakeTeam/types";
import useRemovePlayer from "../../graphql/mutations/useRemovePlayer";

export interface IProps {
  player: IPlayer;
}

export default function RemovePlayerButton(props: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removePlayer] = useRemovePlayer();

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleOnRemove() {
    await removePlayer(props.player);
    toggleConfirmModal();
  }

  return (
    <>
      <Button size="mini" icon="trash" onClick={toggleConfirmModal} />
      <Confirm
        open={isConfirmOpen}
        onCancel={toggleConfirmModal}
        onConfirm={handleOnRemove}
      />
    </>
  );
}
