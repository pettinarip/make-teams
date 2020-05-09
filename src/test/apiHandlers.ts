import { graphql } from "msw";

import { layoutsFixture } from "../graphql/queries/fixtures/layouts";
import { playersFixture } from "../graphql/queries/fixtures/players";

export default [
  graphql.query("ListLayouts", (req, res, ctx) => {
    return res(ctx.data(layoutsFixture));
  }),

  graphql.query("ListPlayers", (req, res, ctx) => {
    return res(ctx.data(playersFixture));
  }),
];
