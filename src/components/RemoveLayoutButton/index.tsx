import { useRef, useState } from "react";
import {
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButtonProps,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { ILayout } from "../../containers/MakeTeam/types";

export interface IProps extends Omit<IconButtonProps, "aria-label"> {
  layout: ILayout;
  onRemoved?: (layout: ILayout) => void;
}

export default function RemoveLayoutButton({
  layout,
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
      onRemoved(layout);
    }
  }

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<DeleteIcon />}
        {...restProps}
        aria-label="Remove layout"
        onClick={toggleConfirmModal}
        data-testid="remove-layout-btn"
      />
      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={toggleConfirmModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove layout {layout.name}
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={toggleConfirmModal}>
                No
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
