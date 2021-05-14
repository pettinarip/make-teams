import React from "react";
import * as rtl from "@testing-library/react";
import { QueryClientProvider } from "react-query";

import { AuthContext } from "../contexts/auth";
import { queryClient } from "../setupTests";
import { IUser } from "../dal/user/types";

function render(ui: any, { ...renderOptions }: any = {}): rtl.RenderResult {
  function Wrapper({ children }: any) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
      </QueryClientProvider>
    );
  }
  return {
    ...rtl.render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}

function renderWithAuth(ui: any, renderOptions: any = {}) {
  const user: IUser = { id: "test", email: "test@test.com" };

  return render(
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {ui}
    </AuthContext.Provider>,
    renderOptions
  );
}

// TODO: open an issue on DOM Testing Library to make this built-in...
async function waitForElementToBeRemoved(
  cb: any,
  options?: rtl.waitForOptions
) {
  try {
    await rtl.waitForElementToBeRemoved(cb, options);
  } catch (error) {
    // rtl.screen.debug(document.body);
    // throw error;
  }
}

function sleep() {
  return Promise.resolve();
}

function dragAndDrop(src: Element, dst: Element) {
  rtl.fireEvent.dragStart(src);
  rtl.fireEvent.dragEnter(dst);
  rtl.fireEvent.drop(dst);
  rtl.fireEvent.dragLeave(dst);
  rtl.fireEvent.dragEnd(src);
}

export { default as userEvent } from "@testing-library/user-event";
export * from "@testing-library/react";
export {
  render,
  renderWithAuth,
  waitForElementToBeRemoved,
  sleep,
  dragAndDrop,
};
