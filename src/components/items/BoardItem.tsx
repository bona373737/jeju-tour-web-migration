/**
 * @Filename: BoardItem.js
 * @Description: 공지사항, FAQ 게시판 리스트 아이템 컴포넌트
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Arrow from '../../assets/icon/arrow.png'; 

const BoardItemContainer = styled.div`
    border-bottom: 1px solid var(--subgray);
    padding: 15px 0;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center; 

    .item {
        width: 90%;
        
        .title {
            padding-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .date {
            color: var(--textgray);
        }
    }
    
    .arrow {
        width: 12px;
        height: 12px;
        transform: rotate(-90deg);
    }
`;

const BoardItem = ({item, api}) => {
    return (
        <BoardItemContainer>
            <NavLink to={`/service/${api}/${item[`${api}_no`]}`} className ="item">
                <p className='title font5'>{item.title}</p>
                <span className='date'>{item.reg_date.substring(0,10)}</span>
            </NavLink>
            <img className="arrow" src={Arrow} alt="arrow"/>
        </BoardItemContainer>
    );
};

export default BoardItem;