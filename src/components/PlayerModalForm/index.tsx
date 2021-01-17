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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import PlayerForm, { IProps as IPlayerFormProps } from "../PlayerForm";

export interface IProps extends Omit<IPlayerFormProps, "bindSubmitForm"> {
  title: string;
  submitBtnText: string;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  hasErrors: boolean;
}

export default function PlayerModalForm(props: IProps) {
  const {
    title,
    submitBtnText,
    isOpen,
    isSubmitting,
    onClose,
    hasErrors,
    initialValues,
    onSubmit,
  } = props;

  let submitForm: Function = () => {};

  function bindSubmitForm(submitFormFn: Function) {
    submitForm = submitFormFn;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
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
            <PlayerForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              bindSubmitForm={bindSubmitForm}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              data-testid="player-submit-button"
              colorScheme="blue"
              onClick={() => submitForm()}
              isLoading={isSubmitting}
              mr={3}
            >
              {submitBtnText}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
