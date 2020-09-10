import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { ToastProvider } from "react-toast-notifications";
import { createClient, Provider } from "urql";

import ViewShareLink from "./containers/ViewShareLink";
import MakeTeam from "./containers/MakeTeam";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";

import * as serviceWorker from "./serviceWorker";

import "semantic-ui-css/semantic.min.css";

// TODO: store this in env
const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

ReactDOM.render(
  <Provider value={client}>
    <ToastProvider>
      <Layout>
        <Router>
          <Login path="/login" />
          <SignUp path="/sign-up" />
          <ResetPassword path="/reset-password" />
          <ViewShareLink path="/share/:shareId" />
          <ProtectedRoute path="/" component={MakeTeam} />
        </Router>
      </Layout>
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
