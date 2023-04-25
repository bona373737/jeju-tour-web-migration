/**
 * @Filename: Main.js
 * @Description: 웹 메인 페이지
 */
import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

/* 홈 페이지 */
import Home from "./Home";
import TabPage from "./TabPage";
/* 추천 테마 상세페이지 */
import ThemeDetail from "./details/ThemeDetail";
/* 여행지, 숙소, 음식 상세페이지 */
import ListDetail from "./details/ListDetail";
/* 로그인, 회원가입 페이지 */
import Login from "./Login";
import Signup from "./Signup";
/* 사이드바의 메뉴 페이지 */
import UserInfo from "./UserInfo";
import MyLike from "./sidebar_menus/MyLike";
import MyReview from "./sidebar_menus/MyReview";
import MyQNA from "./sidebar_menus/MyQNA";
import TourKit from "./sidebar_menus/TourKit";
import ServiceCenter from "./sidebar_menus/ServiceCenter";
/* 검색 결과 페이지 */
import SearchResult from "./SearchResult";
/* 공지사항, FAQ 게시판 전체페이지 */
import BoardPage from "./BoardPage";
/* 공지사항, FAQ 게시판 상세페이지 */
import BoardDetail from "./details/BoardDetail";
/* 1:1 문의 페이지 */
import QNA from "./QNA";

/* 파일업로드 테스트_관리자페이지 여행지 정보 추가 */
import TourInfoAdd from "./admin/TourInfoAdd";
/* 공지사항, FAQ 게시판_관리자페이지 게시글 등록 */
import NoticeAdd from "./admin/NoticeAdd";
import FAQAdd from "./admin/FAQAdd";

// header 높이만큼 Main 영역 상단에 padding값 적용
const MainContainer = styled.div`
  padding-top: 70px;
`;

const Main = memo(() => {
  return (
    <MainContainer>
      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" exact element={<Home />} />
        <Route path="/tab/:api" element={<TabPage />} />
        {/* 추천 테마 상세페이지 */}
        <Route path="/theme/:id" element={<ThemeDetail />} />
        {/* 여행지, 숙소, 음식 상세페이지 */}
        <Route path="/tab/:api/:id" element={<ListDetail />} />
        {/* 로그인, 회원가입 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* 사이드바의 메뉴 페이지 */}
        {/* <Route path='/userinfo' element={<TourInfoAdd/>}/> */}
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/mylike" element={<MyLike />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/myqna" element={<MyQNA />} />
        <Route path="/tourkit" element={<TourKit />} />
        <Route path="/service" element={<ServiceCenter />} />
        {/* 검색 결과 페이지 */}
        <Route path="/search" element={<SearchResult />} />
        {/* 공지사항, FAQ 게시판 전체페이지 */}
        {/* <Route path='/notice' element={<NoticeAdd/>}/> */}
        {/* <Route path='/faq' element={<FAQAdd/>}/> */}
        <Route path="/service/:api" element={<BoardPage />} />
        {/* 공지사항, FAQ 게시판 상세페이지 */}
        <Route path="/service/:api/:id" element={<BoardDetail />} />
        {/* 1:1 문의 페이지 */}
        <Route path="/qna" element={<QNA />} />
      </Routes>
    </MainContainer>
  );
});

export default Main;
