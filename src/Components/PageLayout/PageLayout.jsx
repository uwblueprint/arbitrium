import React from "react";

import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Header2 from "../Header/Header2";
import Footer from "../Footer/Footer";

const PageLayout = ({ children }) => {
  return (
    <>
      <Navigation/>
      <Header/>
      <Header2/>
      <div style={{ marginLeft: 305 }} id="container">
        {children}
      </div>
      <Footer/>
    </>
  );
};

export default PageLayout;
