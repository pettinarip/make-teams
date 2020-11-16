import React from "react";
import * as rtl from "@testing-library/react";
import { ReactQueryConfigProvider, ReactQueryConfig } from "react-query";

import { AuthProvider, useAuth } from "../contexts/auth";

// TODO: shouldn't we just keep the same config used in the app? probably with
// less staleTime
const queryConfig: ReactQueryConfig = {
  queries: {
    retry: 0,
    refetchOnWindowFocus: false,
    useErrorBoundary: true,
  },
  mutations: {
    throwOnError: true,
  },
};

function render(ui: any, { ...renderOptions }: any = {}): rtl.RenderResult {
  function Wrapper({ children }: any) {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryConfigProvider>
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
  return render(<WaitAuth>{ui}</WaitAuth>, renderOptions);
}

function WaitAuth(props: { children: any }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div data-testid="loading" />;
  }

  return props.children;
}

// TODO: open an issue on DOM Testing Library to make this built-in...
async function waitForElementToBeRemoved(cb: any) {
  try {
    await rtl.waitForElementToBeRemoved(cb);
  } catch (error) {
    // rtl.screen.debug(document.body);
    throw error;
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
