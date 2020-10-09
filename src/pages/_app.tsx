import { ChakraProvider } from "@chakra-ui/core";
import { ReactQueryConfigProvider, ReactQueryConfig } from "react-query";
import { ToastProvider } from "react-toast-notifications";
import { AppProps } from "next/app";

import { AuthProvider } from "../contexts/auth";
import Layout from "../components/Layout";
import theme from "../theme";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <ToastProvider>
        <ChakraProvider resetCSS theme={theme}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ChakraProvider>
      </ToastProvider>
    </ReactQueryConfigProvider>
  );
}
