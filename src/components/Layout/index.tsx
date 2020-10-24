import { ReactNode } from "react";
import { Box } from "@chakra-ui/core";

import Header from "../Header";
import Footer from "../Footer";

export interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <Box p={6}>
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
