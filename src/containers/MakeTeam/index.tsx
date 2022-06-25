import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Box } from "@chakra-ui/react";

import MakeTeam from "./MakeTeam";
import Menu from "../../components/Menu";

export interface IProps {}

function MakeTeamManager(__props: IProps) {
  return (
    <Box maxW={{ xl: 1200 }} m="0 auto">
      <Menu mb={12} />
      <DndProvider backend={TouchBackend}>
        <MakeTeam />
      </DndProvider>
    </Box>
  );
}

export default MakeTeamManager;
