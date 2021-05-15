import React, { useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { List, ListItem, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useToast } from "@chakra-ui/toast";
import { IconButton } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import EditPlayerModalForm from "../EditPlayerModalForm";
import Player from "../../../../components/Player";
import RemovePlayerButton from "../RemovePlayerButton";
import useRemovePlayer from "../../../../dal/player/useRemovePlayer";
import { IPlayer } from "../../../MakeTeam/types";

export interface IProps {
  players: Array<IPlayer>;
  selected?: IPlayer;
  usedPlayersIds: Array<string>;
  onPlayerDropInPosition: (player: IPlayer, positionIndex: number) => void;
  onPlayerClick: (player: IPlayer) => void;
}

function PlayersList({
  players,
  selected,
  usedPlayersIds,
  onPlayerDropInPosition,
  onPlayerClick,
}: IProps) {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const editDisclosure = useDisclosure();
  const [editPlayer, setEditPlayer] = useState<IPlayer>();
  const {
    mutateAsync: removePlayer,
    isLoading: isRemoveLoading,
  } = useRemovePlayer();

  const isDark = colorMode === "dark";
  const selectedItemColor = isDark ? "gray.600" : "gray.300";

  async function handleRemove(player: IPlayer) {
    try {
      await removePlayer(player);
      toast({
        title: "Player removed.",
        description: `The new player ${player.lastName} was removed successfully.`,
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "An error occured.",
        description: `While trying to remove the player.`,
        status: "error",
        isClosable: true,
      });
    }
  }

  function handleEdit(player: IPlayer) {
    setEditPlayer(player);
    editDisclosure.onOpen();
  }

  if (isRemoveLoading) {
    return (
      <Stack data-testid="loading">
        <Skeleton height={6} />
        <Skeleton height={6} />
        <Skeleton height={6} />
      </Stack>
    );
  }

  return (
    <>
      <List overflow="auto" flex={1}>
        {players
          .filter((player: IPlayer) => !usedPlayersIds.includes(player.id))
          .map((player: IPlayer) => (
            <ListItem
              role="group"
              key={player.id}
              p={1}
              d="flex"
              flexDirection="row"
              justifyContent="space-between"
              border="1px solid"
              borderRadius={3}
              borderColor="transparent"
              bgColor={
                player.id === selected?.id ? selectedItemColor : "transparent"
              }
            >
              <Player
                player={player}
                onDropInPosition={onPlayerDropInPosition}
                onClick={onPlayerClick}
              />
              <div>
                <IconButton
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  data-testid="edit-player-button"
                  variant="ghost"
                  icon={<EditIcon />}
                  aria-label="Edit player"
                  onClick={() => handleEdit(player)}
                />
                <RemovePlayerButton
                  player={player}
                  onRemoved={handleRemove}
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                />
              </div>
            </ListItem>
          ))}
      </List>
      {editPlayer && (
        <EditPlayerModalForm
          player={editPlayer}
          isOpen={editDisclosure.isOpen}
          onOpen={editDisclosure.onOpen}
          onClose={editDisclosure.onClose}
        />
      )}
    </>
  );
}

export default React.memo(PlayersList);
