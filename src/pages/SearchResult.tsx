/**
 * @Filename: SearchResult.js
 * @Description: 검색 완료 후 결과 페이지
 */
import React, { memo, useEffect } from "react";
import styled from "styled-components";

import { useQueryString } from "../hooks/useQueryString";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResult } from "../slices/SearchSlice";
// import Spinner from '../components/Spinner';
// import ErrorView from '../components/ErrorView';
// import ListItem from '../components/ListItem';

const SearchResultContainer = styled.div`
  width: 100%;

  .search_result {
    width: 100%;
    margin-bottom: 5%;

    div {
      width: 80%;
      margin: 0 auto;
      padding: 5% 0 3% 0;
      border-bottom: 1px solid var(--subblue);

      .keyword {
        padding-right: 5px;
      }

      .result {
        padding-right: 5px;
        font-weight: 600;
        color: var(--blue);
      }
    }
  }
`;

const SearchResult = memo(() => {
  // QueryString의 검색어 받아오기
  const { keyword } = useQueryString();
  // 리덕스를 통한 검색 결과 상태 조회
  const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => state.search);
  // 검색어가 전달되었을 경우
  useEffect(() => {
    dispatch(
      getSearchResult({
        keyword: keyword,
      })
    );
  }, [keyword, dispatch]);

  return (
    <>
      {/* <Spinner visible={loading} />
            {error ? (
                <ErrorView error={error} />
            ) : data && ( */}
      <SearchResultContainer>
        <div className="search_result">
          <div className="contentfont">
            <span className="keyword">"곶자왈"</span>
            <span className="result">1097</span>
            <span>개의 결과가 있습니다</span>
          </div>
        </div>
        {/* 검색어와 일치하는 데이터 map으로 반복 or '일치하는 내용이 없습니다'
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem /> */}
      </SearchResultContainer>
      {/* )} */}
    </>
  );
});

export default SearchResult;
