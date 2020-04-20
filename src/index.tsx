import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { ReactQueryConfigProvider } from "react-query";
import Amplify from "aws-amplify";

import Layout from "./components/Layout";
import MakeTeam from "./containers/MakeTeam";

import * as serviceWorker from "./serviceWorker";
import awsconfig from "./aws-exports";

import "@aws-amplify/ui/dist/style.css";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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
        <MakeTeam path="/" />
      </Router>
    </Layout>
  </ReactQueryConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
