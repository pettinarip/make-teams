import React from "react";
import styled from "@emotion/styled";
import { Segment } from "semantic-ui-react";
import { RouteComponentProps } from "@reach/router";

import useGetShareTeam from "../../graphql/queries/useGetShareTeam";
import Field from "../../components/Field";

interface IProps extends RouteComponentProps<{ shareId: string }> {}

export default function ViewShareLink(props: IProps) {
  const { data: shareTeam } = useGetShareTeam(props.shareId);

  return (
    <Wrapper>
      <Segment>
        <Field
          readonly
          positions={shareTeam ? shareTeam.positions : []}
          onPositionDropInPosition={() => {}}
        />
      </Segment>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
`;
