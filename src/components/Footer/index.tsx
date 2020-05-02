/** @jsx jsx */
import { Grid } from "semantic-ui-react";
import { jsx, css } from "@emotion/core";

export default function Footer() {
  return (
    <Grid
      css={css`
        margin-top: 100px !important;
      `}
    >
      <Grid.Column textAlign="center">
        <small>by</small>{" "}
        <a
          href="https://github.com/pettinarip"
          target="_blank"
          rel="noopener noreferrer"
        >
          @pettinarip
        </a>
      </Grid.Column>
    </Grid>
  );
}
