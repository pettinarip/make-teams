import React, { useState, useCallback } from "react";
import { Segment, Grid } from "semantic-ui-react";
import { RouteComponentProps } from "@reach/router";
import styled from "@emotion/styled";

import useGetShareTeam from "../../graphql/queries/useGetShareTeam";
import Controls from "../../components/Controls";
import FieldStatic from "../../components/FieldStatic";

interface IProps extends RouteComponentProps<{ shareId: string }> {}

export default function ViewShareLink(props: IProps) {
  const { data: shareTeam, isFetching } = useGetShareTeam(props.shareId);
  const [showNames, setShowNames] = useState(true);

  const handleShowNamesChange = useCallback(() => {
    setShowNames((showNames) => !showNames);
  }, []);

  return (
    <Wrapper>
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <FieldStatic
                readonly
                showNames={showNames}
                loading={isFetching}
                positions={shareTeam ? shareTeam.positions : []}
                onPositionDropInPosition={() => {}}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Controls
              showNames={showNames}
              onShowNamesChange={handleShowNamesChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
`;
