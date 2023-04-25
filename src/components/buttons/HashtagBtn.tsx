/**
 * @Filename: HashtagBtn.js
 * @Description: 해시태그 버튼 스타일 컴포넌트
 */
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HashtagBtnContainer = styled(NavLink)`
    padding: 10px;
    margin-right: 3%;
    margin-bottom: 4%;
    border-radius: 20px;
    border: 1px solid var(--blue);
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--blue);
    `;

const HashtagBtn = ({to, onClick, children}) => {
    return (
        <HashtagBtnContainer to={to} onClick={onClick}>
            {`#${children}`}
        </HashtagBtnContainer>
    );
};

export default HashtagBtn;