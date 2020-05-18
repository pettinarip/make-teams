import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { ReactQueryConfigProvider } from "react-query";
import Amplify from "aws-amplify";

import ViewShareLink from "./containers/ViewShareLink";
import MakeTeam from "./containers/MakeTeam";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import * as serviceWorker from "./serviceWorker";
import awsconfig from "./aws-exports";

import "@aws-amplify/ui/dist/style.css";
import "semantic-ui-css/semantic.min.css";

Amplify.configure(awsconfig);

const queryConfig = {
  retry: 3,
  throwOnError: true,
  refetchAllOnWindowFocus: false,
  staleTime: 10 * 1000,
};

ReactDOM.render(
  <ReactQueryConfigProvider config={queryConfig}>
    <Layout>
      <Router>
        <Login path="/login" />
        <SignUp path="/sign-up" />
        <ViewShareLink path="/share/:shareId" />
        <ProtectedRoute path="/" component={MakeTeam} />
      </Router>
    </Layout>
  </ReactQueryConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
