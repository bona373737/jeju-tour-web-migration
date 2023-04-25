/** 
 * @Filename: ThumbItem.js
 * @Description: 여행지, 숙소, 음식 데이터 썸네일 리스트 아이템 컴포넌트
 *               likes테이블에서 현재 로그인한 사용자(member_no)가 스크랩한 
 *               여행지,숙소,음식점(places,accoms,foods 테이블)정보 조회 페이지 
 */
import React from 'react';
import styled from 'styled-components';

const ThumbItemContainer = styled.div`
    width: 150px;
    height: 150px;
    border: 1px solid tomato;
    position: relative;
    img{
        width: 100%;
        object-fit: fill;
    }
    .heart{
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
`;

const ThumbItem = ({item}) => {
    // console.log(item);
    return (
        <ThumbItemContainer>
            <img src="" alt="thumbnail" />
            <div className="heart">
            </div>
        </ThumbItemContainer>
    );
};

export default ThumbItem;