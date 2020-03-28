import React, { ReactNode } from "react";

import Header from "../Header";
import Footer from "../Footer";

export interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
