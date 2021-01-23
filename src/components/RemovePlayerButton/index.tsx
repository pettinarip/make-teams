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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { IPlayer } from "../../containers/MakeTeam/types";

export interface IProps extends Omit<IconButtonProps, "aria-label"> {
  player: IPlayer;
  onRemoved?: (player: IPlayer) => void;
}

export default function RemovePlayerButton({
  player,
  onRemoved,
  ...restProps
}: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const cancelRef = useRef(null);

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  function handleRemove() {
    if (onRemoved) {
      onRemoved(player);
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
