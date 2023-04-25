/**
 * @Filename: index.js
 * @Description: 프로그램 메인 시작점
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import GlobalStyles from "./GlobalStyles";
import Meta from "./Meta";
import App from "./App";

import axios from "axios";
// 배포시 axios base url 설정 코드 삭제하기
// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = "http://3.37.73.36:3001/";
// withCredentials 전역 설정
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> 2번씩 실행되는 것을 방지 --> 배포 시 삭제
  <Provider store={store}>
    <GlobalStyles />
    <Meta />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode> 2번씩 실행되는 것을 방지 --> 배포 시 삭제
);
