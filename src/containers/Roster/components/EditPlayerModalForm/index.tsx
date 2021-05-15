import React, { useCallback, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";

import { IPlayer } from "../../../MakeTeam/types";
import { IFormValues } from "../../../../components/PlayerForm";
import PlayerModalForm from "../../../../components/PlayerModalForm";
import useEditPlayer from "../../../../dal/player/useEditPlayer";

interface IProps {
  player: IPlayer;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function EditPlayerModalForm({ player, isOpen, onClose }: IProps) {
  const toast = useToast();
  const { mutateAsync: editPlayer } = useEditPlayer();
  const [state, setState] = useState({
    isSubmitting: false,
    hasErrors: false,
  });

  const initialValues: IFormValues = useMemo(
    () => ({
      firstName: player.firstName,
      lastName: player.lastName,
      gender: undefined,
      number: player.number,
      position: undefined,
    }),
    [player]
  );

  const handleSubmit = useCallback(async function (values: IFormValues) {
    setState({
      isSubmitting: true,
      hasErrors: false,
    });

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
      setState({
        isSubmitting: false,
        hasErrors: true,
      });

      return;
    }
  }, []);

  return (
    <PlayerModalForm
      title="Modify player"
      submitBtnText="Save"
      isOpen={isOpen}
      onClose={onClose}
      isSubmitting={state.isSubmitting}
      initialValues={initialValues}
      hasErrors={state.hasErrors}
      onSubmit={handleSubmit}
    />
  );
}

export default React.memo(EditPlayerModalForm);
