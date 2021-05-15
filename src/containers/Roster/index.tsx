import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

import useGetPlayers from "../../dal/player/useGetPlayers";
import { hasReachedMaxNumber } from "../../domain/player";
import CreatePlayerButton from "../../components/CreatePlayerButton";
import PlayersList, {
  IProps as IPlayersListProps,
} from "./components/PlayersList";

export interface IProps extends FlexProps, Omit<IPlayersListProps, "players"> {
  onResetClick: () => void;
}

export default function Roster({
  selected,
  usedPlayersIds,
  onPlayerDropInPosition,
  onPlayerClick,
  onResetClick,
  ...restProps
}: IProps) {
  const { data: players = [], isLoading } = useGetPlayers();

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
          <PlayersList
            players={players}
            selected={selected}
            usedPlayersIds={usedPlayersIds}
            onPlayerClick={onPlayerClick}
            onPlayerDropInPosition={onPlayerDropInPosition}
          />
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
