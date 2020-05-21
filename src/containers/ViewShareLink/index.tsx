import React, { useState, useCallback } from "react";
import { Segment, Grid, Form } from "semantic-ui-react";
import { RouteComponentProps } from "@reach/router";
import styled from "@emotion/styled";

import useGetShareTeam from "../../graphql/queries/useGetShareTeam";
import ExportForm from "../../components/ShareTeam/ExportForm";
import Field from "../../components/Field";

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
              <Field
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
            <Form.Field>
              <ExportForm
                shareLink={""}
                showNames={showNames}
                onShowNamesChange={handleShowNamesChange}
              />
            </Form.Field>
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
