import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Container, Placeholder } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import MakeTeam from "./MakeTeam";
import useGetPlayers from "../../graphql/queries/useGetPlayers";

export interface IProps extends RouteComponentProps {}

export default function MakeTeamManager(__props: IProps) {
  const { data: players = [] } = useGetPlayers();

  return (
    <Container>
      <DndProvider backend={Backend}>
        <MakeTeam players={players} />
      </DndProvider>
    </Container>
  );
}
