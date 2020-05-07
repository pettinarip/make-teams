import { MockedRequest } from "msw";
import { DataContext } from "msw/lib/types/context/data";
import { set, delay, fetch, errors, status } from "msw/lib/types/context";

export type { ResponseComposition } from "msw/lib/types/response";

// FIXME: GraphQL types are not exported by msw
export type GraphQLMockedRequest = MockedRequest & {
  variables: Record<string, any>;
};

export interface GraphQLMockedContext {
  set: typeof set;
  status: typeof status;
  delay: typeof delay;
  fetch: typeof fetch;
  data: DataContext<any>;
  errors: typeof errors;
}
