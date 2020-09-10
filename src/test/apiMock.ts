import { response, defaultContext } from "msw";
// import { API } from "aws-amplify";

import handlers from "./apiHandlers";

beforeEach(() => {
  // API.graphql = jest.fn().mockImplementation(async (operation) => {
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   const req = new Request("/graphql", {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(operation),
  //   });
  //   const json = await req.json().catch(() => void 0);
  //   const text = await req.text().catch(() => void 0);
  //   if (json || text) {
  //     // @ts-ignore
  //     req.body = json || text;
  //   }
  //   const relevantRequestHandler = handlers.find((requestHandler) => {
  //     // @ts-ignore
  //     const parsed = requestHandler.parse(req);
  //     // @ts-ignore
  //     return requestHandler.predicate(req, parsed);
  //   });
  //   if (!relevantRequestHandler) {
  //     throw new Error("no request handler found");
  //   }
  //   const { resolver, defineContext } = relevantRequestHandler;
  //   const context = defineContext ? defineContext(req as any) : defaultContext;
  //   const mockedResponse = await resolver(req as any, response, context as any);
  //   if (!mockedResponse) {
  //     throw new Error("mock response must exist");
  //   }
  //   return Promise.resolve(JSON.parse(mockedResponse.body));
  // });
});
