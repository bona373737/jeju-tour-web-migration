/** 
 * @Filename: BoardPage.js
 * @Description: 공지사항, FAQ 게시판 전체페이지 
 */
import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useQueryString } from '../hooks/useQueryString';

import { useSelector, useDispatch } from 'react-redux';
import { getNoticeList } from '../slices/NoticeSlice';
import { getFAQList } from '../slices/FAQSlice';
import { getIsLogin } from '../slices/MemberSlice';

import Spinner from '../components/Spinner';
import ErrorView from '../components/ErrorView';
import BoardItem from '../components/items/BoardItem';
import Arrow from '../assets/icon/arrow.png'; 
import SearchButton from '../assets/icon/search_active.png';

// 전체 컨테이너 스타일
const BoardPageContainer = styled.div`
    width: 100%;
    padding-top: 5%;
    padding-bottom: 20%;

    .content {
        width: 80%;
        margin: 0 auto;

        h1 {
            padding: 20%;
            text-align: center;
        }

        form {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-bottom: 40px;
            border-bottom: 1px solid var(--subgray);

            .select_box {
                flex: 0 1 0;
                display: flex;
                align-content: space-between;
                align-items: center;
                border-radius: 4px 0 0 4px;
                border: 1px solid var(--blue);
                border-right: 0px;

                &:active {
                    outline: none;
                    border: 2px solid var(--blue);
                }
                
                select {
                    border: 0;
                    padding: 10px 10px 10px 15px;

                    &:focus {
                        outline: none;
                    }
                }

                .arrow {
                    width: 12px;
                    height: 12px;
                    padding-right: 5px;
                }
            }

            input {
                flex: 2 1 0;
                padding: 0 3%;
                height: 40px;
                box-sizing: border-box;
                border-radius: 0;
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

        .qna {
            margin-top: 50px;
        }
    }
`;

// 페이지 번호 스타일
const Pagenation = styled.ul`
    list-style: none;
    padding: 0;
    margin: 40px 0 20px 0;
    display: flex;
    justify-content: center;

    a {
        color: #000;
        padding: 8px 13px;
        text-decoration: none;
        margin: 0 5px;

        .arrow {
            width: 12px;
            height: 12px;

            &.left {
                transform: rotate(90deg);
            }

            &.right {
                transform: rotate(-90deg);
            }
        }

        &.current_page {
            color: var(--white);
            background-color: var(--blue);
            border-radius: 4px; 
        }

        &.disabled {
            color: var(--textgray);
            /* 커서가 금지(정지) 모양으로 바뀜 */
            cursor: not-allowed;
        }

        &:hover:not(.current_page) {
            border-radius: 4px; 
            background-color: var(--subgray);
        }
    }
`;

const BoardPage = () => {
    // path 파라미터 값 가져오기
    const { api } = useParams();
    // redux 관련 초기화
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state[api]);
    const { data: loginData } = useSelector((state) => state.member);
    // 페이지 강제 이동 함수 생성
    const navigate = useNavigate();
    // QueryString 문자열 얻기
    const { type, query, page, rows } = useQueryString({
        type: 'T',
        query: '',
        page: 1,
        rows: 6
    });
    // 검색타입 dropdown 참조변수
    const typeDropdownRef = useRef();
    // 검색어 input 참조변수
    const queryInputRef = useRef();
    
    /** api 및 QueryString이 변경될 때마다 실행되는 hook */
    // 페이지 마운트 될때 로그인 상태 확인
    // --> 로그인 여부에 따라 [1:1 문의하기] 버튼 조건부 렌더링
    useEffect(() => {
        if(loginData){
            dispatch(getIsLogin());
        }
        api === 'notice' ?
        dispatch(getNoticeList({
            type: type,
            query: query,
            page: page,
            rows: rows
        })) :
        dispatch(getFAQList({
            type: type,
            query: query,
            page: page,
            rows: rows
        }));
        typeDropdownRef.current.value = type;
        queryInputRef.current.value = query;
        // loginData가 추가되면 무한 새로고침,
        // 없으면 주의 표시가 뜸... 해결 요망!!
    }, [dispatch, api, type, query, page, rows]);

    /** 검색 이벤트 */
    const onSearchSubmit = useCallback(e => {
        e.preventDefault();
        const dropdown = typeDropdownRef.current;
        const input = queryInputRef.current;
        navigate(`/service/${api}/?type=${dropdown.value}&query=${input.value}`);
    },[navigate, api]);

    return (
        <>
            <Spinner visible={loading} />

            <BoardPageContainer>
            <div className='content'>
                <h1 className="font2">{api === 'notice' ? '공지사항' : '자주 묻는 질문'}</h1>

                <form onSubmit={onSearchSubmit}>
                    <div className='select_box'>
                        <select name='type' ref={typeDropdownRef}>
                            <option value='T'>제목</option>
                            <option value='C'>내용</option>
                        </select>
                        <img className="arrow" src={Arrow} alt="arrow"/>
                    </div>
                    <input type='text' name='query' placeholder="검색어를 입력하세요." ref={queryInputRef}/>
                    <button type='submit'>
                        <img className="search_button" src={SearchButton} alt="search" />
                    </button>
                </form>

                {error ? (
                    <ErrorView error={error} />
                ) : data && (
                    <>
                        {data.item.length > 0 && data.item.map((v, i) => <BoardItem key={v[`${api}_no`]} item={v} api={api}/>)}
                        <Pagenation>
                            {data.pagenation.prevGroupLastPage > 0 ? (
                                <li>
                                    <NavLink to={`/service/${api}/?type=${type}&query=${query}&page=${data.pagenation.prevGroupLastPage}&rows=${rows}`}>
                                        <img className="arrow left" src={Arrow} alt="arrow"/>
                                    </NavLink>
                                </li>
                            ) : (
                                <li>
                                    <NavLink to='#' className='disabled'>
                                        <img className="arrow left" src={Arrow} alt="arrow"/>
                                    </NavLink>
                                </li>
                            )}

                            {(() => {
                                const li = [];
                                const start = data.pagenation.groupStart;
                                const end = data.pagenation.groupEnd + 1;
                                for (let i=start; i<end; i++) {
                                    if (i === data.pagenation.nowPage) {
                                        li.push(<li key={i}><NavLink to='#' className='current_page'>{i}</NavLink></li>);
                                    } else {
                                        li.push(<li key={i}><NavLink to={`/service/${api}/?type=${type}&query=${query}&page=${i}&rows=${rows}`}>{i}</NavLink></li>);
                                    }
                                }
                                return li;
                            })()}

                            {data.pagenation.nextGroupFirstPage > 0 ? (
                                <li>
                                    <NavLink to={`/service/${api}/?type=${type}&?query=${query}&page=${data.pagenation.nextGroupFirstPage}&rows=${rows}`}>
                                        <img className="arrow right" src={Arrow} alt="arrow"/>
                                    </NavLink>
                                </li>
                            ) : (
                                <li>
                                    <NavLink to={`/service/${api}/?type=${type}&?query=${query}&page=${data.pagenation.groupEnd}&rows=${rows}`} className='disabled'>
                                        <img className="arrow right" src={Arrow} alt="arrow"/>   
                                    </NavLink>
                                </li>
                            )}
                        </Pagenation> 
                    </>
                )}
                
                {/* 로그인이 되어 있고, api가 faq일 때 1:1문의하기 버튼 활성화 */}
                {loginData && (
                    api === 'faq' && (
                        <NavLink to='/qna'>
                            <button type='button' className='qna btn_act'>1:1 문의하기</button>
                        </NavLink>
                    )
                )}
            </div>
        </BoardPageContainer>
        </>
    );
};

export default BoardPage;