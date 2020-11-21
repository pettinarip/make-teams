import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButtonProps,
  IconButton,
  useToast,
} from "@chakra-ui/core";
import { DeleteIcon } from "@chakra-ui/icons";

import { IPlayer } from "../../containers/MakeTeam/types";
import useRemovePlayer from "../../dal/player/useRemovePlayer";

export interface IProps extends Omit<IconButtonProps, "aria-label"> {
  player: IPlayer;
}

export default function RemovePlayerButton({ player, ...restProps }: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removePlayer] = useRemovePlayer();
  const cancelRef = useRef(null);
  const toast = useToast();

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleRemove() {
    try {
      await removePlayer(player);
      toast({
        title: "Player removed.",
        description: `The new player ${player.lastName} was removed successfully.`,
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "An error occured.",
        description: `While trying to remove the player.`,
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <>
      <IconButton
        {...restProps}
        data-testid="delete-player-button"
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
