import { ReactNode, useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ChakraProps,
} from "@chakra-ui/core";

import useAddNewPlayer from "../../dal/player/useAddNewPlayer";
import CreatePlayerForm, { IFormValues } from "./CreatePlayerForm";

export interface IProps extends ChakraProps {
  children: ReactNode;
}

export default function CreatePlayerButton({ children, ...restProps }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [addNewPlayer] = useAddNewPlayer();

  let submitForm: Function = () => {};

  function bindSubmitForm(submitFormFn: Function) {
    submitForm = submitFormFn;
  }

  async function handleSubmit(values: IFormValues) {
    setIsSubmitting(true);
    setHasErrors(false);

    try {
      const newPlayer = {
        firstName: values.firstName,
        lastName: values.lastName,
        number: values.number || 0,
      };
      await addNewPlayer(newPlayer);
      onClose();
    } catch (e) {
      console.log(e);
      setHasErrors(true);
    }

    setIsSubmitting(false);
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} {...restProps}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add a new player to the team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Avatar
                src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                size="md"
              />
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
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
              <CreatePlayerForm
                onSubmit={handleSubmit}
                bindSubmitForm={bindSubmitForm}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => submitForm()}
                isLoading={isSubmitting}
                mr={3}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
