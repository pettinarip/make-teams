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
  AlertDescription,
} from "@chakra-ui/react";

import LayoutForm, { IProps as ILayoutFormProps } from "../LayoutForm";

export interface IProps extends Omit<ILayoutFormProps, "bindSubmitForm"> {
  title: string;
  submitBtnText: string;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  error?: string;
}

export default function LayoutModalForm(props: IProps) {
  const {
    title,
    submitBtnText,
    isOpen,
    isSubmitting,
    onClose,
    error,
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
            {!!error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <LayoutForm
              initialValues={initialValues}
              onSubmit={onSubmit}
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
              {submitBtnText}
            </Button>
            <Button onClick={onClose} data-testid="new-layout-cancel-button">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
