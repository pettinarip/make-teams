import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
} from "@chakra-ui/core";
import { DeleteIcon } from "@chakra-ui/icons";

import { IPlayer } from "../../containers/MakeTeam/types";
import useRemovePlayer from "../../dal/player/useRemovePlayer";

export interface IProps {
  player: IPlayer;
}

export default function RemovePlayerButton(props: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removePlayer] = useRemovePlayer();
  const cancelRef = useRef(null);

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleRemove() {
    await removePlayer(props.player);
  }

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<DeleteIcon />}
        aria-label="Remove player"
        onClick={toggleConfirmModal}
      />
      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={toggleConfirmModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove player from the roster
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to end up the contract with{" "}
              {props.player.lastName}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={toggleConfirmModal}>
                Never mind
              </Button>
              <Button colorScheme="red" onClick={handleRemove} ml={3}>
                Do it!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
