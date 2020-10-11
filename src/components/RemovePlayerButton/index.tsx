import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ChakraProps,
  IconButton,
} from "@chakra-ui/core";
import { DeleteIcon } from "@chakra-ui/icons";

import { IPlayer } from "../../containers/MakeTeam/types";
import useRemovePlayer from "../../dal/player/useRemovePlayer";

export interface IProps extends ChakraProps {
  player: IPlayer;
}

export default function RemovePlayerButton({ player, ...restProps }: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removePlayer] = useRemovePlayer();
  const cancelRef = useRef(null);

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleRemove() {
    await removePlayer(player);
  }

  return (
    <>
      <IconButton
        {...restProps}
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
              {player.lastName}?
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
