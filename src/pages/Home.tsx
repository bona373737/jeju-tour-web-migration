/**
 * @Filename: Home.js
 * @Description: 홈 페이지 추천 테마 리스트
 *               최신 여행지 정보 조회 후 리스트로 출력
 */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getPlaceList } from "../slices/PlaceSlice";

import Spinner from "../components/Spinner";
import ThemeItem from "../components/items/ThemeItem";
import TabArea from "../components/TabArea";

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10%;
  background-color: #e3eeff88;
`;

const Home = () => {
  // redux 최신 여행지 정보 조회
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.place);

  // 페이지 마운트 시 여행지 정보 확인
  useEffect(() => {
    dispatch(
      getPlaceList({
        rows: 5,
      })
    );
  }, [dispatch]);

  return (
    <HomeContainer>
      <TabArea />

      <Spinner visible={loading} />

      {data && data.item.map((v, i) => <ThemeItem key={v.place_no} item={v} />)}
    </HomeContainer>
  );
};

export default Home;
