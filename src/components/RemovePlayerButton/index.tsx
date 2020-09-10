import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

import { IPlayer } from "../../containers/MakeTeam/types";
// import useRemovePlayer from "../../graphql/mutations/useRemovePlayer";

export interface IProps {
  player: IPlayer;
}

export default function RemovePlayerButton(props: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  // const [removePlayer] = useRemovePlayer();

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleOnRemove() {
    // await removePlayer(props.player);
  }

  return (
    <>
      <Button size="mini" icon="trash" onClick={toggleConfirmModal} />
      <Confirm
        open={isConfirmOpen}
        onCancel={toggleConfirmModal}
        onConfirm={handleOnRemove}
        header="Remove player from the roster"
        content={`Are you sure you want to end up the contract with ${props.player.lastName}?`}
        cancelButton="Never mind"
        confirmButton="Do it!"
      />
    </>
  );
}
