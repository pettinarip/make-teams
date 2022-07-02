import React from "react";
import { Box } from "@chakra-ui/react";

import { DndContextProvider } from "../../contexts/dnd";

import MakeTeam from "./MakeTeam";
import Menu from "../../components/Menu";

export interface IProps {}

function MakeTeamManager(__props: IProps) {
  return (
    <Box maxW={{ xl: 1200 }} m="0 auto">
      <Menu mb={12} />
      <DndContextProvider>
        <MakeTeam />
      </DndContextProvider>
    </Box>
  );
}

export default MakeTeamManager;
