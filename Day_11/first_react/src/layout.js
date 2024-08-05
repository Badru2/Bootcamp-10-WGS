import React from "react";
import Navigation from "./header";

import "./css/output.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
