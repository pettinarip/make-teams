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
} from "@chakra-ui/core";

import { ILayout } from "../../containers/MakeTeam/types";
import useRemoveLayout from "../../dal/layout/useRemoveLayout";
import { DeleteIcon } from "@chakra-ui/icons";

export interface IProps {
  layout: ILayout;
  onRemoved?: (layout: ILayout) => void;
}

export default function RemoveLayoutButton(props: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removeLayout] = useRemoveLayout();
  const cancelRef = useRef(null);

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  function handleRemove() {
    // As we are performing optimistic updates, we just close the modal and
    // assume the removal was executed ok
    toggleConfirmModal();
    removeLayout(props.layout);

    if (props.onRemoved) {
      props.onRemoved(props.layout);
    }
  }

  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
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
              Remove layout {props.layout.name}
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
