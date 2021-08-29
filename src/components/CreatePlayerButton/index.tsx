import { ReactNode, useState } from "react";
import { Button, useDisclosure, useToast, ButtonProps } from "@chakra-ui/react";

import useAddNewPlayer from "../../dal/player/useAddNewPlayer";
import { EGender, IFormValues } from "../PlayerForm";
import PlayerModalForm from "../PlayerModalForm";

export interface IProps extends ButtonProps {
  children: ReactNode;
}

export default function CreatePlayerButton({ children, ...restProps }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const { mutateAsync: addNewPlayer } = useAddNewPlayer();
  const toast = useToast();

  const initialValues: IFormValues = {
    firstName: "",
    lastName: "",
    gender: EGender.OTHER,
    number: undefined,
    position: "gl",
  };

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

      toast({
        title: "Player saved.",
        description: `The new player ${values.lastName} was saved successfully.`,
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
      <Button colorScheme="blue" onClick={onOpen} {...restProps}>
        {children}
      </Button>
      <PlayerModalForm
        title="Add a new player to the team"
        submitBtnText="Create"
        isOpen={isOpen}
        onClose={onClose}
        isSubmitting={isSubmitting}
        initialValues={initialValues}
        hasErrors={hasErrors}
        onSubmit={handleSubmit}
      />
    </>
  );
}
