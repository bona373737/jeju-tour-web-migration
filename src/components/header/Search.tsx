/**
 * @Filename: Search.js
 * @Description: 검색 팝업창 영역
 */
import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useQueryString } from "../../hooks/useQueryString";
import RegexHelper from "../../utils/RegexHelper";
import HashtagBtn from "../buttons/HashtagBtn";
import CloseButton from "../../assets/icon/close.png";
import SearchButton from "../../assets/icon/search_active.png";

const SearchContainer = styled.div`
  width: 100%;

  .dimmed {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    background-color: rgba(0, 0, 0, 0.6);
    display: none;

    &.open {
      display: block;
      animation: dimmed-show 0.3s;
    }

    .search_box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--white);
      animation: box-show 0.3s;

      form {
        box-sizing: border-box;
        display: flex;
        margin-top: 17%;
        margin-left: 10%;

        input {
          padding: 0 3%;
          width: 80%;
          height: 40px;
          border-radius: 4px 0 0 4px;
          border: 1px solid var(--blue);

          &:focus {
            outline: none;
            border: 2px solid var(--blue);
          }
        }

        button {
          width: 40px;
          height: 40px;
          border-radius: 0 4px 4px 0;
          border: 1px solid var(--blue);
          background: var(--blue);

          .search_button {
            height: 25px;
            vertical-align: middle;
          }
        }
      }

      .close_button {
        position: absolute;
        top: 5%;
        right: 3%;
        height: 30px;
        padding: 5px;
      }

      .hashtag_wrap {
        margin: 5% 10%;
        display: flex;
        flex-flow: row wrap;
      }
    }
  }

  @keyframes dimmed-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes box-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Search = memo(({ open, setIsOpen, close }) => {
  // 검색어 추출하기
  const { query } = useQueryString();
  // 검색어 전송
  const navigate = useNavigate();
  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // 입력한 검색어 추출하기
      const keyword = e.target.keyword.value;
      // 입력값에 대한 유효성 검사
      try {
        RegexHelper.value(keyword, "검색어를 입력하세요.");
      } catch (err) {
        alert(err.message);
        e.target.focus();
        return;
      }
      // 이동할 url 주소를 입력
      navigate(`/search?keyword=${keyword}`);
      // 검색창 닫기
      setIsOpen(false);
    },
    [setIsOpen, navigate]
  );
  // 해시태그에 삽입될 키워드 배열
  const TagKeyword = [
    "곶자왈",
    "여름",
    "금오름",
    "머체왓숲길",
    "추자도",
    "섭지코지",
  ];
  return (
    <SearchContainer>
      <div className={open ? "dimmed open" : "dimmed"}>
        {open && (
          <div className="search_box">
            <form onSubmit={onSearchSubmit}>
              <input
                type="search"
                name="keyword"
                placeholder="검색어를 입력하세요."
                defaultValue={query}
              />
              <button type="submit">
                <img
                  className="search_button"
                  src={SearchButton}
                  alt="search"
                />
              </button>
            </form>
            <img
              className="close_button"
              src={CloseButton}
              onClick={close}
              alt="close"
            />
            <div className="hashtag_wrap">
              {/* 추천검색어 --> 실제 데이터랑 연결해야함 */}
              {TagKeyword.map((v, i) => {
                return (
                  <HashtagBtn
                    key={i}
                    to={`/search?keyword=${encodeURIComponent(v)}`}
                    onClick={close}
                    children={v}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SearchContainer>
  );
});

export default Search;
