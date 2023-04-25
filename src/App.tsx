/**
 * @Filename: App.js
 * @Description: 컴포넌트 정의 프로그램
 */
import React from "react";

import { isMobile } from "./utils/isMobile";

import Header from "./components/header/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";

const App = () => {
  isMobile();

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
