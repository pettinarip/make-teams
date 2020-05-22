/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  List,
  Header,
  Placeholder,
  Divider,
  Button,
  Loader,
} from "semantic-ui-react";

import { IPlayer } from "../MakeTeam/types";
import useAuth from "../../components/ProtectedRoute/useAuth";
import useGetPlayers from "../../graphql/queries/useGetPlayers";
import CreatePlayerButton from "../../components/CreatePlayerButton";
import RemovePlayerButton from "../../components/RemovePlayerButton";
import Player from "../../components/Player";

export interface IProps {
  usedPlayersIds: Array<number>;
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
  const { status, data: players = [], isFetching } = useGetPlayers(user);

  return (
    <div>
      <Header as="h2">Roster ({players.length})</Header>
      {(isLoading || status === "loading") && (
        <Placeholder fluid data-testid="loading">
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      )}
      <List
        css={css`
          max-height: 300px;
          overflow: auto;
        `}
      >
        {players
          .filter((p) => !usedPlayersIds.includes(p.id))
          .map((player) => (
            <List.Item key={player.id}>
              <List.Content floated="right">
                <RemovePlayerButton player={player} />
              </List.Content>
              <Player
                player={player}
                onDropInPosition={onPlayerDropInPosition}
                onClick={onPlayerClick}
              />
            </List.Item>
          ))}
      </List>
      <Divider />
      {isFetching ? (
        <Loader active inline="centered" data-testid="loading" />
      ) : (
        <div>
          <CreatePlayerButton>New</CreatePlayerButton>
          <Button onClick={onResetClick}>Reset</Button>
        </div>
      )}
    </div>
  );
}
