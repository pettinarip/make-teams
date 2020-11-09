import { ReactNode, useState } from "react";
import { FormikHelpers } from "formik";
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
  useDisclosure,
  useToast,
  ButtonProps,
} from "@chakra-ui/core";

import useAddNewLayout from "../../dal/layout/useAddNewLayout";
import CreateLayoutForm, { IFormValues } from "./CreateLayoutForm";
import { CreateLayoutMutation } from "../../graphql/API";
import toErrorMap from "../../utils/toErrorMap";

export interface IProps extends ButtonProps {
  children: ReactNode;
}

export default function CreateLayoutButton({ children, ...restProps }: IProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [addNewLayout] = useAddNewLayout();

  let submitForm: Function = () => {};

  function bindSubmitForm(submitFormFn: Function) {
    submitForm = submitFormFn;
  }

  async function handleSubmit(
    values: IFormValues,
    { setErrors }: FormikHelpers<IFormValues>
  ) {
    setIsSubmitting(true);
    setError("");

    try {
      const response = (await addNewLayout(values)) as CreateLayoutMutation;
      const errors = response?.createCustomLayout?.errors;

      if (errors) {
        const error = errors[0];
        if (error.field) {
          setErrors(toErrorMap(errors));
        } else {
          setError(error.message);
        }
      } else {
        toast({
          title: "Layout saved.",
          description: `The new layout ${values.name} was saved successfully.`,
          status: "success",
          isClosable: true,
        });
        onClose();
      }
    } catch (e) {
      console.log(e);
      setError("There was an unexpected error while creating the layout");
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
              {!!error && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  <AlertDescription>{error}</AlertDescription>
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
