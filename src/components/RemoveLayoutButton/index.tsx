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
  useToast,
  IconButtonProps,
} from "@chakra-ui/core";
import { DeleteIcon } from "@chakra-ui/icons";

import { ILayout } from "../../containers/MakeTeam/types";
import useRemoveLayout from "../../dal/layout/useRemoveLayout";

export interface IProps extends Omit<IconButtonProps, "aria-label"> {
  layout: ILayout;
  onRemoved?: (layout: ILayout) => void;
}

export default function RemoveLayoutButton({
  layout,
  onRemoved,
  ...restProps
}: IProps) {
  const toast = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removeLayout] = useRemoveLayout();
  const cancelRef = useRef(null);

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleRemove() {
    try {
      await removeLayout(layout);
      toast({
        title: "Layout removed.",
        description: `The layout ${layout.name} was removed successfully.`,
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "An error occured.",
        description: `While trying to remove the layout ${layout.name}.`,
        status: "error",
        isClosable: true,
      });
    }

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
