import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Container } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import MakeTeam from "./MakeTeam";
import Menu from "../../components/Menu";

export interface IProps extends RouteComponentProps {}

function MakeTeamManager(__props: IProps) {
  return (
    <Container>
      <Menu />
      <DndProvider backend={HTML5Backend}>
        <MakeTeam />
      </DndProvider>
    </Container>
  );
}

export default MakeTeamManager;
