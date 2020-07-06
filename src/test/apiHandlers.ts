import { graphql } from "msw";

import { playersFixture } from "../graphql/queries/fixtures/players";
import * as shareTeamDB from "./data/shareTeam";
import * as layoutsDB from "./data/layouts";

export default [
  graphql.query("ListLayouts", (req, res, ctx) => {
    return res(ctx.data(layoutsDB.readResponse()));
  }),

  graphql.query("ListPlayers", (req, res, ctx) => {
    return res(ctx.data(playersFixture));
  }),

  graphql.mutation("CreateShareLink", (req, res, ctx) => {
    const link = shareTeamDB.read();
    return res(ctx.data({ createShareLink: link }));
  }),

  graphql.mutation<any, { input: any }>(
    "CreateCustomLayout",
    (req, res, ctx) => {
      const layout = layoutsDB.create((req?.body as any).variables.input);
      return res(ctx.data({ createCustomLayout: layout }));
    }
  ),
];
