import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  List,
  ListItem,
  Skeleton,
  Stack,
} from "@chakra-ui/core";

import { IPlayer } from "../MakeTeam/types";
import useGetPlayers from "../../dal/player/useGetPlayers";
import { hasReachedMaxNumber } from "../../domain/player";
import CreatePlayerButton from "../../components/CreatePlayerButton";
import EditPlayerButton from "../../components/EditPlayerButton";
import RemovePlayerButton from "../../components/RemovePlayerButton";
import Player from "../../components/Player";

export interface IProps extends FlexProps {
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
  const { status, data: players = [] } = useGetPlayers();

  const isLoading = status === "loading";

  return (
    <Flex {...restProps} h="100%" direction="column" justify="space-between">
      <Heading as="h4" fontSize="md" mb={6}>
        Roster ({players.length})
      </Heading>

      {isLoading ? (
        <Stack data-testid="loading">
          <Skeleton height={6} />
          <Skeleton height={6} />
          <Skeleton height={6} />
        </Stack>
      ) : (
        <>
          <List overflow="auto" flex={1}>
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
                  <div>
                    <EditPlayerButton
                      player={player}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                    />
                    <RemovePlayerButton
                      player={player}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                    />
                  </div>
                </ListItem>
              ))}
          </List>
          <Box data-testid="roster-buttons" mt={6}>
            {hasReachedMaxNumber(players) && (
              <Alert status="warning" mb={4}>
                <AlertIcon />
                You've reached the max number of players.
              </Alert>
            )}
            <CreatePlayerButton mr={3} disabled={hasReachedMaxNumber(players)}>
              New
            </CreatePlayerButton>
            <Button onClick={onResetClick}>Reset</Button>
          </Box>
        </>
      )}
    </Flex>
  );
}
