/** 
 * @Filename: ReviewTrigger.js
 * @Description: 내 리뷰 리스트 아이템 내의 작성 정보 컴포넌트
 */
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const ReviewTriggerContainer=styled.div`
    .review_item_top{
        display: flex;
        justify-content: space-between;
        .left{
            
        }
        .right{
            color: var(--gray);
        }
    }//review_item_top
    .trriger_title{

    }
`;

const ReviewTrigger = ({item}) => {

    const edit_date = dayjs(item?.edit_date).format("YYYY-MM-DD")

    return (
        item&&(
                <ReviewTriggerContainer>
                    <div className='review_item_top'>
                        <div className='left'>
                            <span>작성자 : {item.userid}</span>
                        </div>
                        <div className='right'>
                            <span>{edit_date}</span>
                        </div>
                    </div>
                    <div className='trigger_title'>
                        {item.title}▽
                    </div>
                </ReviewTriggerContainer>
        )      
    );
};

export default ReviewTrigger;