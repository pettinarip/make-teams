import { ReactNode, useState } from "react";
import { FormikHelpers } from "formik";
import { Button, useDisclosure, useToast, ButtonProps } from "@chakra-ui/react";

import useAddNewLayout from "../../dal/layout/useAddNewLayout";
import { CreateLayoutMutation } from "../../graphql/API";
import toErrorMap from "../../utils/toErrorMap";
import fillPositions from "./fillPositions";
import LayoutModalForm from "../LayoutModalForm";
import { IFormValues, MAX_NUMBER_POSITIONS } from "../LayoutForm";

export interface IProps extends ButtonProps {
  children: ReactNode;
}

export default function CreateLayoutButton({ children, ...restProps }: IProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState({
    isSubmitting: false,
    error: "",
  });
  const { mutateAsync: addNewLayout } = useAddNewLayout();

  const initialValues: IFormValues = {
    name: "",
    positions: fillPositions([], MAX_NUMBER_POSITIONS),
  };

  async function handleSubmit(
    values: IFormValues,
    { setErrors }: FormikHelpers<IFormValues>
  ) {
    setState({ isSubmitting: true, error: "" });

    try {
      const response = (await addNewLayout(values)) as CreateLayoutMutation;
      const errors = response?.createCustomLayout?.errors;

      if (errors) {
        const error = errors[0];
        if (error.field) {
          setErrors(toErrorMap(errors));
        } else {
          setState({ ...state, error: error.message });
        }
        return;
      }

      toast({
        title: "Layout saved.",
        description: `The new layout ${values.name} was saved successfully.`,
        status: "success",
        isClosable: true,
      });

      onClose();
    } catch (e) {
      console.log(e);
      setState({
        ...state,
        error: "There was an unexpected error while creating the layout",
      });
    }

    setState({ ...state, isSubmitting: false });
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
      <LayoutModalForm
        title="Add a new layout"
        submitBtnText="Create"
        isOpen={isOpen}
        isSubmitting={state.isSubmitting}
        onClose={onClose}
        error={state.error}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}
