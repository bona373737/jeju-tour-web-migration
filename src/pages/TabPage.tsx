/**
 * @Filename: TabPage.js
 * @Description: 여행지, 숙소, 음식 탭 버튼 클릭 시 보여질 페이지
 *               path 파라미터를 전달받아 axios 통신 파라미터로 전달
 *               여행지, 숙소, 음식 각 데이터를 불러와 화면에 리스트로 출력
 */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import useMountedRef from "../hooks/useMountedRef";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getPlaceList, addPlaceList } from "../slices/PlaceSlice";
import { getAccomList, addAccomList } from "../slices/AccomSlice";
import { getFoodList, addFoodList } from "../slices/FoodSlice";
import { getIsLogin } from "../slices/MemberSlice";

import Spinner from "../components/Spinner";
import TabArea from "../components/TabArea";
import ListItem from "../components/items/ListItem";
import HashtagBtn from "../components/buttons/HashtagBtn";
import Heart from "../components/Heart";
import { getMyLikeList } from "../slices/MyLikeSlice";

const TabPageContainer = styled.div`
  .content_wrap {
    width: 80%;
    margin: auto;
    margin-top: 20px;
    .hashtag_wrap {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }

      a {
        flex: 0 0 auto;
      }
    }
    .list_wrap {
      .item_wrap {
        display: flex;
      }
    }
  }
`;

const TabPage = () => {
  //path파라미터 값 가져오기
  const { api } = useParams();
  let tagArr;
  if (api === "place") {
    tagArr = ["섬속의섬", "지질트레일", "오름", "실내관광지", "수국"];
  } else if (api === "accom") {
    tagArr = ["게스트하우스", "독채", "휴양펜션", "수영장", "가족호텔"];
  } else if (api === "food") {
    tagArr = ["향토음식", "카페", "물회", "고기국수", "수제버거"];
  }

  /** redux */
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state[api]);
  const { data: loginData } = useSelector((state) => state.member);

  /**무한스크롤 */
  // let currentPage = 1;
  const [ref, inView] = useInView({ threshold: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  // console.log("현재 페이지 : "+currentPage);
  //검색어
  let queryKeyword = null;
  //마지막페이지 인지 검사
  const [isEnd, setIsEnd] = useState(false);
  const [query, setQuery] = useState("");

  //페이지 마운트 될때 로그인상태 확인--> 로그인여부에 따라 "좋아요"버튼 조건부 렌더링
  //tab바뀔때마다 데이터 재전송,재랜더링
  useEffect(() => {
    setCurrentPage(1);
    console.log(api);
    if (loginData) {
      dispatch(getIsLogin());
    }
    //api값(place,accom,food)에 따라 dispatch함수 분기처리
    if (api === "place") {
      dispatch(getPlaceList());
    } else if (api === "accom") {
      dispatch(getAccomList());
    } else if (api === "food") {
      dispatch(getFoodList());
    }
  }, [dispatch, api]);

  /** 태그버튼 클릭이벤트 */
  const onTagClick = useCallback(
    (e) => {
      e.preventDefault();
      //해당 태그명을 검색어으로 하여 데이터 재요청
      const activeQuery = e.target.innerHTML.slice(1);
      // console.log("원래query :"+ query)
      setQuery(activeQuery);
      // console.log("변경query :"+ query)

      if (api === "place") {
        dispatch(getPlaceList({ query: activeQuery, page: 1 }));
      } else if (api === "accom") {
        dispatch(getAccomList({ query: activeQuery, page: 1 }));
      } else if (api === "food") {
        dispatch(getFoodList({ query: activeQuery, page: 1 }));
      }
      //파란색으로 css변경
    },
    [api]
  );

  const mountedRef = useMountedRef();
  //스크롤이벤트_스크롤이 바닥에 닿으면 다음페이지의 데이터 로딩
  useEffect(() => {
    if (mountedRef.current) {
      if (inView && !loading && !data.pagenation.isEnd) {
        console.log(currentPage);
        setCurrentPage((currentPage) => currentPage + 1);
        if (api === "place") {
          dispatch(addPlaceList({ page: currentPage + 1 }));
        } else if (api === "accom") {
          dispatch(addAccomList({ page: currentPage + 1 }));
        } else if (api === "food") {
          dispatch(addFoodList({ page: currentPage + 1 }));
        }
      }
    }
    // },[mountedRef,inView,currentPage,isEnd,api]);
  }, [inView]);

  return (
    <TabPageContainer>
      <TabArea />

      <Spinner visible={loading} />

      <div className="content_wrap">
        <div className="hashtag_wrap">
          {tagArr.map((v, i) => (
            <HashtagBtn key={i} to="" onClick={onTagClick}>
              {v}
            </HashtagBtn>
          ))}
        </div>
        <div className="list_wrap">
          {data &&
            data.item.map((v, i) => {
              return (
                <div key={i} className="item_wrap">
                  <ListItem item={v} api={api}></ListItem>
                  {/* {loginData&&(
                                        <>
                                        <Heart item={v}></Heart>
                                        <p>{`placeno:${v.place_no} accomno:${v.accom_no} foodno:${v.food_no}`}</p>
                                        </>
                                        )
                                    } */}
                </div>
              );
            })}
        </div>
        <div ref={ref}></div>
      </div>
    </TabPageContainer>
  );
};

export default TabPage;
