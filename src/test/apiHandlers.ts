import { graphql } from "msw";

import {
  GraphQLMockedRequest,
  GraphQLMockedContext,
  ResponseComposition,
} from "./types";
import { IPlayer } from "../containers/MakeTeam/types";

export default [
  graphql.query("ListLayouts", (req, res, ctx) => {
    // const matchingBooks = booksDB.readManyNotInList([]).slice(0, 10)

    return res(ctx.data({ listLayouts: { items: [] } }));
  }),

  graphql.query("ListPlayers", (req, res, ctx) => {
    // const matchingBooks = booksDB.readManyNotInList([]).slice(0, 10)
    const player: IPlayer = {
      id: 1,
      firstName: "Pablo",
      lastName: "Pettinari",
      number: 5,
    };

    return res(ctx.data({ listPlayers: { items: [player] } }));
  }),
].map((handler) => {
  return {
    ...handler,
    async resolver(
      req: GraphQLMockedRequest,
      res: ResponseComposition,
      ctx: GraphQLMockedContext
    ) {
      try {
        const result = await handler.resolver(req, res, ctx);
        // if (shouldFail(req)) {
        //   throw new Error("Random failure (for testing purposes). Try again.");
        // }
        return result;
      } catch (error) {
        return res(
          ctx.status(error.status || 500),
          ctx.data({ message: error.message || "Unknown Error" })
        );
      } finally {
        await sleep();
      }
    },
  };
});

function sleep() {
  return Promise.resolve();
}

function shouldFail(req: any) {
  if (JSON.stringify(req.body)?.includes("FAIL")) return true;
  if (req.query.toString()?.includes("FAIL")) return true;
  if (process.env.NODE_ENV === "test") return false;
  const failureRate = 0.2;
  return Math.random() < failureRate;
}
