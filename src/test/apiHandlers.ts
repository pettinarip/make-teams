import { graphql, rest } from "msw";

import * as shareTeamDB from "./data/shareTeam";
import * as layoutsDB from "./data/layouts";
import * as playersDB from "./data/players";

export default () => [
  graphql.query("Me", (__req, res, ctx) => {
    return res(
      ctx.data({
        me: { id: "1", email: "test@test.com" },
      })
    );
  }),

  graphql.mutation("CreateShareLink", (__req, res, ctx) => {
    const link = shareTeamDB.read();
    return res(ctx.data({ createShareLink: link }));
  }),

  graphql.query("ListLayouts", (__req, res, ctx) => {
    return res(ctx.data(layoutsDB.readResponse()));
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

  graphql.query("Players", (__req, res, ctx) => {
    const players = playersDB.read();
    return res(ctx.data({ players }));
  }),

  graphql.mutation("CreatePlayer", (req, res, ctx) => {
    const player = playersDB.create((req?.body as any).variables);
    return res(ctx.data({ createPlayer: player }));
  }),

  graphql.mutation("EditPlayer", (req, res, ctx) => {
    const edited = playersDB.edit((req?.body as any).variables);
    return res(ctx.data({ editPlayer: edited }));
  }),

  graphql.mutation("DeletePlayer", (req, res, ctx) => {
    const removed = playersDB.remove((req?.body as any).variables);
    return res(ctx.data({ deletePlayer: removed }));
  }),

  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/image`, (_req, res, ctx) => {
    return res(ctx.set("Content-Type", "image/png"), ctx.body("blob"));
  }),
];
