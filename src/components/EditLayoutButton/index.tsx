import { useState } from "react";
import {
  IconButton,
  useToast,
  IconButtonProps,
  useDisclosure,
} from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";

import { ILayout } from "../../containers/MakeTeam/types";
import LayoutModalForm from "../LayoutModalForm";
import { IFormValues } from "../LayoutForm";
import useEditLayout from "../../dal/layout/useEditLayout";

export interface IProps extends Omit<IconButtonProps, "aria-label"> {
  layout: ILayout;
}

export default function EditLayoutButton({ layout, ...restProps }: IProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editLayout] = useEditLayout();

  const initialValues: IFormValues = {
    name: layout.name,
    positions: layout.positions,
  };

  async function handleSubmit(values: IFormValues) {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await editLayout({
        id: layout.id,
        ...values,
      });

      if (!response) {
        throw new Error("Error while updating layout");
      }

      toast({
        title: "Layout saved.",
        description: `The layout ${values.name} was saved successfully.`,
        status: "success",
        isClosable: true,
      });

      onClose();
    } catch (e) {
      console.log(e);
      setError("There was an unexpected error while updating the layout");
    }

    setIsSubmitting(false);
  }

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<EditIcon />}
        {...restProps}
        aria-label="Edit layout"
        onClick={onOpen}
        data-testid="edit-layout-btn"
      />
      <LayoutModalForm
        title="Edit layout"
        submitBtnText="Save"
        isOpen={isOpen}
        isSubmitting={isSubmitting}
        onClose={onClose}
        error={error}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}
