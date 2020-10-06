import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Button, Center } from "@chakra-ui/core";

import { IPosition } from "../MakeTeam/types";
import useCreateShareTeam from "../../dal/shareLink/useCreateShareTeam";
import ExportForm from "./ExportForm";

interface IProps {
  positions: Array<IPosition>;
}

export default function ShareTeam({ positions }: IProps) {
  const [link, setLink] = useState("");
  const { addToast } = useToasts();

  const [createShareTeam, { status }] = useCreateShareTeam();

  async function handleClick() {
    try {
      // TODO: add a name to the share team
      const shareLink = await createShareTeam({ name: "test", positions });
      setLink(`${window.location.origin}/share/${shareLink?.id}`);
    } catch (error) {
      addToast(
        "There was an error while trying to share your team. Please, try again.",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }
  }

  return (
    <Center flexDirection="column">
      <Button
        onClick={handleClick}
        colorScheme="green"
        isLoading={status === "loading"}
        data-testid="share-team-btn"
      >
        Share your team!
      </Button>
      {link && <ExportForm shareLink={link} my={6} />}
    </Center>
  );
}
