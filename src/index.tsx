import "dotenv-safe";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { ReactQueryConfigProvider, ReactQueryConfig } from "react-query";
import { ToastProvider } from "react-toast-notifications";

import ViewShareLink from "./containers/ViewShareLink";
import MakeTeam from "./containers/MakeTeam";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";

import { AuthProvider } from "./domain/user/useAuth";
import * as serviceWorker from "./serviceWorker";

import "semantic-ui-css/semantic.min.css";

const queryConfig: ReactQueryConfig = {
  queries: {
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 10 * 1000,
  },
  mutations: {
    throwOnError: true,
  },
};

ReactDOM.render(
  <ReactQueryConfigProvider config={queryConfig}>
    <ToastProvider>
      <AuthProvider>
        <Layout>
          <Router>
            <Login path="/login" />
            <SignUp path="/sign-up" />
            <ForgotPassword path="/forgot-password" />
            <ResetPassword path="/reset-password/:token" />
            <ViewShareLink path="/share/:shareId" />
            <ProtectedRoute path="/" component={MakeTeam} />
          </Router>
        </Layout>
      </AuthProvider>
    </ToastProvider>
  </ReactQueryConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
