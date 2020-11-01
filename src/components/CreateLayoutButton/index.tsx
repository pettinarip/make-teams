import { ReactNode, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  useToast,
  ButtonProps,
} from "@chakra-ui/core";

import useAddNewLayout from "../../dal/layout/useAddNewLayout";
import CreateLayoutForm, { IFormValues } from "./CreateLayoutForm";

export interface IProps extends ButtonProps {
  children: ReactNode;
}

export default function CreateLayoutButton({ children, ...restProps }: IProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [addNewLayout] = useAddNewLayout();

  let submitForm: Function = () => {};

  function bindSubmitForm(submitFormFn: Function) {
    submitForm = submitFormFn;
  }

  async function handleSubmit(values: IFormValues) {
    setIsSubmitting(true);
    setHasErrors(false);

    try {
      await addNewLayout(values);

      toast({
        title: "Layout saved.",
        description: `The new layout ${values.name} was saved successfully.`,
        status: "success",
        isClosable: true,
      });

      onClose();
    } catch (e) {
      console.log(e);
      setHasErrors(true);
    }

    setIsSubmitting(false);
  }

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        data-testid="new-layout-button"
        {...restProps}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add a new layout</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {hasErrors && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>
                    There was an error with your submission
                  </AlertTitle>
                  <AlertDescription>
                    Complete all the fields and try again.
                  </AlertDescription>
                </Alert>
              )}
              <CreateLayoutForm
                onSubmit={handleSubmit}
                bindSubmitForm={bindSubmitForm}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => submitForm()}
                isLoading={isSubmitting}
                data-testid="new-layout-submit-button"
                mr={3}
              >
                Create
              </Button>
              <Button onClick={onClose} data-testid="new-layout-cancel-button">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
