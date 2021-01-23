import { useState } from "react";
import { Button, Center, useToast } from "@chakra-ui/react";

import { IPosition } from "../MakeTeam/types";
import useCreateShareTeam from "../../dal/shareLink/useCreateShareTeam";
import ExportForm from "./ExportForm";

interface IProps {
  positions: Array<IPosition>;
  showNames: boolean;
}

export default function ShareTeam({ positions, showNames }: IProps) {
  const [id, setId] = useState("");
  const [link, setLink] = useState("");
  const toast = useToast();

  const { mutateAsync: createShareTeam, isLoading } = useCreateShareTeam();

  async function handleClick() {
    try {
      // TODO: add a name to the share team
      const shareLink = await createShareTeam({ name: "test", positions });
      setLink(`${window.location.origin}/share/${shareLink?.id}`);
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
      {link && (
        <ExportForm id={id} shareLink={link} showNames={showNames} my={6} />
      )}
    </Center>
  );
}
