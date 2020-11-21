import { useState } from "react";
import {
  IconButton,
  IconButtonProps,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";

import { IPlayer } from "../../containers/MakeTeam/types";
import { IFormValues } from "../PlayerForm";
import PlayerModalForm from "../PlayerModalForm";
import useEditPlayer from "../../dal/player/useEditPlayer";

interface IProps extends Omit<IconButtonProps, "aria-label"> {
  player: IPlayer;
}

export default function EditPlayerButton({ player, ...restProps }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [editPlayer] = useEditPlayer();
  const toast = useToast();

  const initialValues: IFormValues = {
    firstName: player.firstName,
    lastName: player.lastName,
    gender: undefined,
    number: player.number,
    position: undefined,
  };

  async function handleSubmit(values: IFormValues) {
    setIsSubmitting(true);
    setHasErrors(false);

    try {
      const newPlayer = {
        id: player.id,
        firstName: values.firstName,
        lastName: values.lastName,
        number: values.number || 0,
      };
      await editPlayer(newPlayer);

      toast({
        title: "Player saved.",
        description: `The player ${values.lastName} was saved successfully.`,
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
      <IconButton
        {...restProps}
        data-testid="edit-player-button"
        variant="ghost"
        icon={<EditIcon />}
        aria-label="Edit player"
        onClick={onOpen}
      />
      <PlayerModalForm
        title="Modify player"
        submitBtnText="Save"
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
