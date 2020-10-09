import {
  Box,
  Button,
  Center,
  Heading,
  List,
  ListItem,
  Skeleton,
  Spinner,
} from "@chakra-ui/core";

import { IPlayer } from "../MakeTeam/types";
import { useAuth } from "../../contexts/auth";
import useGetPlayers from "../../dal/player/useGetPlayers";
import CreatePlayerButton from "../../components/CreatePlayerButton";
import RemovePlayerButton from "../../components/RemovePlayerButton";
import Player from "../../components/Player";

export interface IProps {
  usedPlayersIds: Array<string>;
  onPlayerDropInPosition: (player: IPlayer, positionIndex: number) => void;
  onPlayerClick: (player: IPlayer) => void;
  onResetClick: () => void;
}

export default function Roster({
  usedPlayersIds,
  onPlayerDropInPosition,
  onPlayerClick,
  onResetClick,
}: IProps) {
  const { user = {}, isLoading } = useAuth();
  const { status, data: players = [] } = useGetPlayers(user);

  return (
    <Box>
      <Heading as="h4" size="md" mb={6}>
        Roster ({players.length})
      </Heading>

      <Skeleton
        isLoaded={!isLoading && status !== "loading"}
        data-testid="loading"
      >
        <List maxH={300} overflow="auto">
          {players
            .filter((p) => !usedPlayersIds.includes(p.id))
            .map((player, index) => (
              <ListItem
                key={player.id}
                mt={index !== 0 ? 4 : 0}
                d="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Player
                  player={player}
                  onDropInPosition={onPlayerDropInPosition}
                  onClick={onPlayerClick}
                />
                <RemovePlayerButton player={player} />
              </ListItem>
            ))}
        </List>
      </Skeleton>
      {isLoading ? (
        <Center data-testid="loading">
          <Spinner />
        </Center>
      ) : (
        <Box data-testid="roster-buttons" mt={6}>
          <CreatePlayerButton mr={3}>New</CreatePlayerButton>
          <Button onClick={onResetClick}>Reset</Button>
        </Box>
      )}
    </Box>
  );
}
