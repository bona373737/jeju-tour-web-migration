/**
 * @Filename: TabBtn.js
 * @Description: 탭 버튼 스타일 컴포넌트
 */
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const TabBtnContainer = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const TabBtn = ({to,children}) => {
    return (
        <TabBtnContainer to={to}>
            {children}
        </TabBtnContainer>
    );
};

export default TabBtn;