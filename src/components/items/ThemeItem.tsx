/**
 * @Filename: ThemeItem.js
 * @Description: 홈 페이지 추천 테마 리스트 아이템 컴포넌트
 */
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ThemeItemContainer = styled.div`
    width: 80%;
    height: 200px;
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 10%;
    background: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2)
    ), url(${props => props.src});
    background-size: cover;
    background-position: center;

    .themeitem_text {
        color: var(--white);

        .title {
            padding: 20px 15px 0;
        }

        .intro {
            padding: 15px 15px 0;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.3;
        }
    }
`;

const ThemeItem = memo(({item}) => {
    console.log(item.ima)
    return (
        <NavLink to={`/theme/${item.place_no}`}>
            <ThemeItemContainer src={`${process.env.REACT_APP_STATIC_PATH}${item.image}`}>
                <div className="themeitem_text">
                    <h1 className="title font1">{item.title}</h1>
                    <p className="intro font5">{item.introduction}</p>
                </div>
            </ThemeItemContainer>
        </NavLink>
    );
});

export default ThemeItem;
