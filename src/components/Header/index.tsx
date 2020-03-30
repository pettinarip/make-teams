/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Grid, Header as HeaderSemantic } from "semantic-ui-react";

export default function Header() {
  return (
    <Grid>
      <Grid.Column textAlign="center">
        <div
          css={css`
            padding: 40px;
            margin-bottom: 30px;
          `}
        >
          <HeaderSemantic size="huge">
            Make a Team
            <HeaderSemantic.Subheader>
              Choose your team layout and build your team!
            </HeaderSemantic.Subheader>
          </HeaderSemantic>
        </div>
      </Grid.Column>
    </Grid>
  );
}
