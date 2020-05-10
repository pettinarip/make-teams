import React from "react";
import * as rtl from "@testing-library/react";
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = {
  retry: 0,
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
};

function render(ui: any, { ...renderOptions }: any = {}): any {
  function Wrapper({ children }: any) {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        {children}
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

// TODO: open an issue on DOM Testing Library to make this built-in...
async function waitForElementToBeRemoved(cb: any, ...args: any) {
  try {
    await rtl.waitForElementToBeRemoved(cb, ...args);
  } catch (error) {
    rtl.screen.debug(document.body);
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
export { render, waitForElementToBeRemoved, sleep, dragAndDrop };
