/** 
 * @Filename: ReivewItem.js
 * @Description: 내 리뷰 리스트 아이템 컴포넌트
 */
import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';

import SubmitBtn from '../buttons/SubmitBtn';
import ReviewTrigger from '../ReviewTrigger';

const ReviewItemContainer = styled.li`
    list-style: none;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom: 0.5px solid var(--gray);

    textarea{
        width: 100%;
        border: 0;
    }

    .btn_wrap{
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
            
        }
    }
`;

const ReviewItem = ({item}) => {
    const [editBtn, setEditBtn] = useState(false);
    
    return (
        item &&(
            <ReviewItemContainer>
            <Collapsible trigger={<ReviewTrigger item={item}/>}>
                <p>{item.content}</p>
            {/* {
                editBtn? 
                <textarea name="" id="" cols="30" rows="10" defaultValue={item.content}>
                </textarea>
                :
                <p>
                    {item.content}
                </p>
                } */}
                <div className='btn_wrap'>

                    {
                        editBtn?
                        <SubmitBtn children="등록" onClickFun={()=>setEditBtn(false)}></SubmitBtn>
                        :
                        <SubmitBtn children="수정" onClickFun={()=>setEditBtn(true)}></SubmitBtn>
                    }
                    <SubmitBtn children="삭제"></SubmitBtn>
                </div>
            </Collapsible>
            </ReviewItemContainer>
        )
    );
};//component end
                
export default ReviewItem;