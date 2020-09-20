import { graphql } from "msw";

import { playersFixture } from "../graphql/queries/fixtures/players";
import * as shareTeamDB from "./data/shareTeam";
import * as layoutsDB from "./data/layouts";

export default [
  graphql.query("ListLayouts", (req, res, ctx) => {
    return res(ctx.data(layoutsDB.readResponse()));
  }),

  graphql.query("Players", (req, res, ctx) => {
    return res(ctx.data({ players: playersFixture }));
  }),

  graphql.mutation("CreateShareLink", (req, res, ctx) => {
    const link = shareTeamDB.read();
    return res(ctx.data({ createShareLink: link }));
  }),

  graphql.mutation<any, { input: any }>("CreateLayout", (req, res, ctx) => {
    layoutsDB.create((req?.body as any).variables);
    return res(ctx.data({ createCustomLayout: true }));
  }),

  graphql.mutation<any, { input: any }>(
    "DeleteCustomLayout",
    (req, res, ctx) => {
      layoutsDB.remove((req?.body as any).variables);
      return res(ctx.data({ deleteCustomLayout: true }));
    }
  ),
];
