import { Auth } from "aws-amplify";

beforeEach(() => {
  Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
    return { username: "test" };
  });

  Auth.currentSession = jest.fn().mockImplementation(() => {
    return {
      getAccessToken: () => ({
        getJwtToken: () => "token",
      }),
    };
  });
});
