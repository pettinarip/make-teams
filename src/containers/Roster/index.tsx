import {
  Box,
  Button,
  Center,
  ChakraProps,
  Flex,
  Heading,
  List,
  ListItem,
  Skeleton,
  Spinner,
  Stack,
} from "@chakra-ui/core";

import { IPlayer } from "../MakeTeam/types";
import { useAuth } from "../../contexts/auth";
import useGetPlayers from "../../dal/player/useGetPlayers";
import CreatePlayerButton from "../../components/CreatePlayerButton";
import RemovePlayerButton from "../../components/RemovePlayerButton";
import Player from "../../components/Player";

export interface IProps extends ChakraProps {
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
  ...restProps
}: IProps) {
  const { user, isLoading } = useAuth();
  const { status, data: players = [] } = useGetPlayers(user);

  return (
    <Flex {...restProps} h="100%" direction="column" justify="space-between">
      <Heading as="h4" fontSize="md" mb={6}>
        Roster ({players.length})
      </Heading>

      {isLoading || status === "loading" ? (
        <Stack data-testid="loading">
          <Skeleton height={6} />
          <Skeleton height={6} />
          <Skeleton height={6} />
        </Stack>
      ) : (
        <List overflow="auto">
          {players
            .filter((p) => !usedPlayersIds.includes(p.id))
            .map((player, index) => (
              <ListItem
                role="group"
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
                <RemovePlayerButton
                  player={player}
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                />
              </ListItem>
            ))}
        </List>
      )}
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
    </Flex>
  );
}
