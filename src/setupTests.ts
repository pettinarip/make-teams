// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import next from "next";
import MatchMediaMock from "jest-matchmedia-mock";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Instantiate Next.js in order to load env.test file. Jest automatically runs
// with NODE_ENV=test
next({});

import { setupServer, SetupServerApi } from "msw/node";
import { QueryClient } from "react-query";
import apiHandlers from "./test/apiHandlers";
import "./test/localStorageMock";

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = "15000";

// TODO: shouldn't we just keep the same config used in the app? probably with
// less staleTime
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
});

// Establish API mocking before all tests.
export let server: SetupServerApi;
beforeAll(() => {
  const handlers = apiHandlers();
  server = setupServer(...handlers);
  server.listen();
  new MatchMediaMock();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  queryClient.clear();
  jest.clearAllMocks();
  server.resetHandlers();
  localStorage.reset();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
