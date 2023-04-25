/** 
 * @Filename: ServiceCenter.js
 * @Description: 사이드바의 고객센터 메뉴 페이지 
 */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getNoticeList } from '../../slices/NoticeSlice';
import { getFAQList } from '../../slices/FAQSlice';

import Spinner from '../../components/Spinner';
import Arrow from "../../assets/icon/arrow.png";

const ServiceContainer = styled.div`
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

        .notice {
            box-sizing: border-box;
            width: 100%;
            height: 60px;
            padding: 0 20px;
            overflow: hidden;
            background: var(--subgray);
            border-radius: 1mm;

            .notice_container {
                transition: transform 1s;

                .notice_content {
                    display: flex;
                    flex-flow: row wrap;
                    height: 30px;
                    padding: 15px 0;
                    line-height: 30px;

                    .notice_header {
                        padding-right: 10px;
                        color: var(--blue); 
                    }

                    .notice_title {
                        width: 80%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        
        .faq {
            margin-top: 50px;

            .faq_list {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 30px;

                .arrow {
                    width: 12px;
                    height: 12px;
                    transform: rotate(-90deg);
                }
            }

            .faq_container {            
                .faq_content {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: baseline;
                    padding: 15px 0;
                    border-bottom: 1px solid var(--subgray);

                    .faq_header {
                        padding-right: 10px; 
                    }

                    .faq_title {
                        width: 90%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
`;

const ServiceCenter = () => {
    // 공지사항/자주묻는질문 리스트 노출 아이템 갯수
    const rows = 5;
    // 공지사항 리스트 순서(인덱스) 상태값
    const [ idx, setIdx ] = useState(0);
    const idxRef = useRef(0);
    // redux 관련 초기화
    const dispatch = useDispatch();
    const { data:nData, loading:nLoading, error:nError } = useSelector((state) => state.notice);
    const { data:fData, loading:fLoading, error:fError } = useSelector((state) => state.faq);

    /** 고객센터 마운트 시 실행되는 hook */ 
    useEffect(() => {
        dispatch(getNoticeList({
            query: '',
            rows : rows,
            page: 1
        }));
        dispatch(getFAQList({
            query: '',
            rows : rows,
            page: 1
        }));
    }, [dispatch]);

    /** 공지사항 리스트 순서 설정 hook */ 
    useEffect(() => {
        setInterval(() => {
            idxRef.current = (idxRef.current + 1) % rows;
            setIdx(idxRef.current);
        }, 2000);
    }, [rows]);

    return (
        <>
            <Spinner visible={nLoading || fLoading}/>

            <ServiceContainer>
                <div className='content'>
                    <h1 className="font2">트라이 고객센터</h1>
                    <ul className='notice'>
                        <div className='notice_container' style={{ transform: `translateY(-${60 * idx}px)` }}>
                            {nData && nData.item.map((v, i) => {
                                return (
                                    <NavLink to={`/service/notice/${v.notice_no}`} key={i}>
                                        <li className='notice_content'>
                                            <span className='notice_header font5'>공지</span> 
                                            <p className='notice_title font6'>{v.title}</p>
                                        </li>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </ul>
                    <div className='faq'>
                        <div className='faq_list'>
                            <h3 className='font3'>자주 묻는 질문</h3>
                            <NavLink to='/service/faq' className='font9'>
                                전체보기
                                <img className='arrow' src={Arrow} alt='arrow'/>
                            </NavLink>
                        </div>
                        <ul className='faq_container'>
                            {fData && fData.item.map((v, i) => {
                                return (
                                    <NavLink to={`/service/faq/${v.faq_no}`} key={i}>
                                        <li className='faq_content'>
                                            <span className='faq_header font6'>Q</span>
                                            <p className='faq_title font9'>{v.title}</p>
                                        </li>
                                    </NavLink>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </ServiceContainer>
        </>
    );
};

export default ServiceCenter;