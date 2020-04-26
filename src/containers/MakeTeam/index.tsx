import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Container } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import MakeTeam from "./MakeTeam";

export interface IProps extends RouteComponentProps {}

function MakeTeamManager(__props: IProps) {
  return (
    <Container>
      <DndProvider backend={Backend}>
        <MakeTeam />
      </DndProvider>
    </Container>
  );
}

export default MakeTeamManager;
