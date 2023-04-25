/** 
 * @Filename: MyLike.js
 * @Description: 사이드바의 메뉴링크에서 연결되는 내 저장 메뉴 페이지 
 */
import React, { useEffect, useState,useCallback } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import {getMyLikeList} from '../../slices/MyLikeSlice';
import {deleteMyLikeItem} from '../../slices/MyLikeSlice'
import { getPlaceList } from "../../slices/PlaceSlice";
import xMark from '../../assets/icon/close.png';

import ThumbItem from '../../components/items/ThumbItem';
import ListItem from '../../components/items/ListItem';
import Spinner from '../../components/Spinner';

const MyLikeContainer = styled.div`
    width: 80%;
    margin: auto;

    button{
        background-color: tomato;
    }
    .thum_wrap{
        //grid학습해서 css변경 하기
        display: flex;
        flex-wrap: wrap;
    }
    .item_wrap{
        display: flex;
        align-items: center;
        img{
            height: 30px;
        }
    }
    .message{
        width: 100%;
        margin-top: 100px;
        text-align: center;
    }
`;

const MyLike = () => {
    //리덕스초기화
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.myLike);

    //화면 렌더링될때 내저장 리스트 불러오기
    useEffect(()=>{
        dispatch(getMyLikeList());
    },[])

//     const xMarkClick = useCallback((e)=>{
//         //이벤트버블링 방지 
//         e.stopPropagation();
//         // e.preventDefault();
//         const like_no = e.target.dataset.like_no

//         //좋아요 삭제요청전송 
//         try {
//             dispatch(deleteMyLikeItem({like_no:like_no}))
//         } catch (error) {
//             window.alert(error);
//             return;
//         }
//         //redux dispatch
//         dispatch(getMyLikeList());
//         dispatch(getPlaceList());
// },[]);

    return (
        <MyLikeContainer>
            <Spinner visible={loading}/>
                <div>
                    {data ?
                        data.item.map((v,i)=>{
                            return (
                                <div className='item_wrap' key={i}>
                                    <ListItem item={v}></ListItem>
                                    {/* <div>
                                    <img src={xMark} onClick={xMarkClick} data-like_no={v.like_no}></img>
                                    </div> */}
                                </div>
                            )
                        })
                        :
                        <h1 className='message font5'> 저장된 여행지가 없습니다. </h1>
                    }
                </div>
        </MyLikeContainer>
    );
};

export default MyLike;