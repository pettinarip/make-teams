import { useState } from "react";
import { Button, Center, useDisclosure, useToast } from "@chakra-ui/react";

import useCreateShareTeam from "../../dal/shareLink/useCreateShareTeam";
import { IPosition } from "../MakeTeam/types";
import ShareModal from "./Modal";

interface IProps {
  positions: Array<IPosition>;
  showNames: boolean;
}

export default function ShareTeam({ positions, showNames }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");
  const toast = useToast();

  const { mutateAsync: createShareTeam, isLoading } = useCreateShareTeam();

  async function handleClick() {
    setId("");
    onOpen();
    try {
      // TODO: add a name to the share team
      const shareLink = await createShareTeam({ name: "test", positions });
      setId(shareLink?.id!);
    } catch (error) {
      toast({
        title: "An error ocurred.",
        description: "While trying to share your team. Please, try again.",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <Center flexDirection="column">
      <Button
        onClick={handleClick}
        colorScheme="green"
        isLoading={isLoading}
        data-testid="share-team-btn"
        disabled={!positions.length}
      >
        Share your team!
      </Button>
      <ShareModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        showNames={showNames}
        id={id}
      />
    </Center>
  );
}
