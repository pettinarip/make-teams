// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { queryCache } from "react-query";

// Mock Amplify modules
import "./test/authMock";
import "./test/apiMock";

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = "15000";

afterEach(() => {
  queryCache.clear();
  jest.clearAllMocks();
});
