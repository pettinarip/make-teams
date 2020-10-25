// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { queryCache } from "react-query";
import next from 'next'
import MatchMediaMock from "jest-matchmedia-mock";

// Instantiate Next.js in order to load env.test file. Jest automatically runs
// with NODE_ENV=test
next({})

import { server } from "./test/server";

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = "15000";

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
  new MatchMediaMock()
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  queryCache.clear();
  jest.clearAllMocks();
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => server.close());