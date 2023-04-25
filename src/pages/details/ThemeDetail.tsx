/**
 * @Filename: ThemeDetail.js
 * @Description: 추천 테마 리스트 아이템 클릭 시 보여질 상세페이지
 */
import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ThemeDetailContainer = styled.div`
    width: 100%;

    .themedetail_imgwrapper {
        width: 100%;
        background: linear-gradient(
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.2)
        ), url(${props => props.src});
        background-size: cover;
        background-position: center;

        .themedetail_title {
            width: 80%;
            margin: 0 auto;
            padding: 40px 0 120px 0;
            color: var(--white);

            .intro {
                padding-top: 15px;
                line-height: 1.3;
            }
        }
    }

    .themedetail_content {
        width: 80%;
        margin: 0 auto;
        padding: 40px 0;
        line-height: 1.5;

        .line {
            padding: 15px 0;
            border-bottom: 1px solid var(--subgray);

            &:first-child {
                padding-top: 0;
            }
        }

        .tag_wrap {
            display: flex;
            flex-flow: row wrap;

            .tag_title {
                width: 100%;
                padding-bottom: 15px;
            }

            .tags {
                padding: 10px;
                margin-right: 3%;
                margin-bottom: 4%;
                border-radius: 20px;
                border: 1px solid var(--textgray);
                font-weight: 600;
                font-size: 1.2rem;
                color: var(--textgray);
            }
        }

        button {
            margin-top: 40px;
        }
    }
`;

const ThemeDetail = memo(() => {
    // path 파라미터 값 가져오기
    const { id } = useParams();
    // redux 최신 여행지 정보 가져오기
    const { data, loading, error } = useSelector((state) => state.place);
    // data.item 상태값
    const [ item, setItem ] = useState();
    
    /** id가 변경될 때마다 실행되는 hook */
    useEffect(() => {
        const idx = data.item.findIndex(e => e.place_no === parseInt(id));
        setItem(data.item[idx]);
    }, [data, id]);
    console.log(item);
    
    return (
        item && (
            <ThemeDetailContainer src={`${process.env.REACT_APP_STATIC_PATH}${item.image}`}>
                <div className="themedetail_imgwrapper">
                    <div className="themedetail_title">
                        <h1 className="title font1">{item.title}</h1>
                        <p className="intro font3">{item.introduction}</p>
                    </div>
                </div>

                <ul className="themedetail_content">
                    <li className='line'>
                        <p className="font8">우편 번호</p>
                        <p className="font4">{item.postcode ? item.postcode : '등록된 우편 번호가 없습니다.'}</p>
                    </li>
                    <li className='line'>
                        <p className="font8">주소지</p>
                        <p className="font4">{item.roadaddress ? item.roadaddress : '등록된 주소지가 없습니다.'}</p>
                    </li>
                    <li className='line tag_wrap'>
                        <p className="font8 tag_title">연관 태그</p>
                        {item.tag && item.tag.split(",").map((v, i) => <div className="tags" key={i}>#{v}</div>)}
                    </li>
                    <NavLink to={`/tab/place/${item.place_no}`} state={{item: item}}>
                        <button type="button" className="btn_act">
                            자세히 보기
                        </button>
                    </NavLink>
                </ul>
            </ThemeDetailContainer>
        )
    );
});

export default ThemeDetail;