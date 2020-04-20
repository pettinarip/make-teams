import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Container } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { withAuthenticator } from "aws-amplify-react";

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

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
  ],
};

export default withAuthenticator(MakeTeamManager, {
  usernameAttributes: "email",
  signUpConfig,
} as any);
