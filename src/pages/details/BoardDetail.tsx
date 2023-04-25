/** 
 * @Filename: BoardDetail.js
 * @Description: 공지사항, FAQ 게시판 상세페이지
 */
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const BoardDetailContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    padding-top: 5%;
    padding-bottom: 20%;

    .title {
        margin-top: 30px;
        padding-bottom: 5px;
        line-height: 1.5;
    }

    .date {
        color: var(--textgray);
        padding-bottom: 10px;
        border-bottom: 1px solid var(--subgray);
    }

    .content {
        width: 100%;
        padding: 30px 0 50px 0;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;

const BoardDetail = () => {
    // 페이지 강제 이동 함수 생성
    const navigate = useNavigate();
    // path 파라미터 값 가져오기
    const { api, id } = useParams();
    // redux 관련 초기화
    const { data, loading, error } = useSelector((state) => state[api]);
    // data.item 상태값
    const [ origin, setOrigin ] = useState({
        title: '',
        content: '',
        reg_date: '',
        edit_date: ''
    });

    /** api/ id가 변경될 때마다 실행되는 hook */
    useEffect(() => {
        const idx = data.item.findIndex(e => e[`${api}_no`] === parseInt(id));
        setOrigin({
            title: data.item[idx].title,
            content: data.item[idx].content,
            reg_date: data.item[idx].reg_date,
            edit_date: data.item[idx].edit_date
        });
    }, [api, data, id]);

    /** 목록 버튼 클릭 이벤트 처리 */
    const backToList = useCallback(e => {
        e.preventDefault();
        navigate(`/service/${api}`);
    }, [api, navigate]);

    return (
        data && (
            <BoardDetailContainer>
                <h1 className="title font5">{origin.title}</h1>
                <p className="date font8">
                    {origin.edit_date ?
                    origin.edit_date.substring(0,10) :
                    origin.reg_date.substring(0,10)}
                </p>
                <div className="content font7">{origin.content}</div>
                <button type='button' className='btn_act' onClick={backToList}>목록</button>
            </BoardDetailContainer>
        )
    );
};

export default BoardDetail;