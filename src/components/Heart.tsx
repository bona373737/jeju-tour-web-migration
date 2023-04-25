/** 
 * @Filename: Heart.js
 * @Description: 좋아요 하트버튼
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { postItem, deleteMyLikeItem } from '../slices/MyLikeSlice';
import { getPlaceList } from "../slices/PlaceSlice";
import { getAccomList } from "../slices/AccomSlice";
import { getFoodList } from "../slices/FoodSlice";
import useMountedRef from '../hooks/useMountedRef';

import heart from '../assets/icon/heart.png';
import heart_active from '../assets/icon/heart_active.png';

 const HeartContainer = styled.div`
    display: flex;
    align-items: center;
    .like_icon{
        display: block;
        width: 20px;
        padding: 15px;
        cursor: pointer;
    }
 `;

 const Heart = ({ref_id,ref_type,like_no}) => {
     
    // console.log("__________ref_id :"+ ref_id+ "ref_type :" + ref_type)
    // let ref_id;
    // let ref_type;
    // if(item.place_no){
    //     ref_id=item.place_no;
    //     ref_type='place';
    // }else if(item.accom_no){
    //     ref_id=item.accom_no;
    //     ref_type='accom';
    // }else if(item.food_no){
    //     ref_id=item.food_no;
    //     ref_type='food';
    // }
    // let ref_id = item.place_no? item.place_no : (item.accom_no? item.accom_no : item.food_no );
    // let ref_type = item.place_no? 'place' : (item.accom_no? 'accom' : 'food' );
    // const like_no = like_no;

    const dispatch = useDispatch();
    // const { data } = useSelector((state) => state.myLike);

    //초기값은 좋아요에 등록된 여부에 따라 결정
    const initIsLiked = like_no? true : false;
    const [isLiked, setIsLiked] = useState(initIsLiked);
    
    // const mountedRef = useMountedRef();
    //스크롤이벤트_스크롤이 바닥에 닿으면 다음페이지의 데이터 로딩
    // useEffect(()=>{
    //     if(mountedRef.current){
    //         // console.log('mountedRef.current____'  + ref_type)
    //         //isLiked가 바뀌면 리랜더링시키기
    //         if(ref_type==="place"){
    //             dispatch(getPlaceList());
    //         }else if( ref_type ==='accom'){
    //             dispatch(getAccomList());
    //         }else if(ref_type==='food'){
    //             dispatch(getFoodList());
    //         }
    //     }
    // },[isLiked])

    //좋아요 버튼 클릭이벤트
    const onClick = useCallback((e)=>{
        // e.stopPropagation();
        e.preventDefault();
        console.log("ref_id :"+ ref_id+ "ref_type :" + ref_type)

        if(isLiked){
            //isLiked값이 현재 true면 클릭시 좋아요 삭제요청전송 
            try {
                dispatch(deleteMyLikeItem({like_no:like_no}))
            } catch (error) {
                window.alert(error);
                return;
            }
            setIsLiked(false)
            switch (ref_type) {
                case "place":
                    dispatch(getPlaceList());
                    break;
                case "accom":
                    dispatch(getAccomList());
                    break;
                case "food":
                    dispatch(getFoodList());
                    break;
                default:
                    break;
            }

        }else if(!isLiked){
            //isLiked값이 현재 false면 클릭시 좋아요 추가요청 전송 
            try {
                dispatch(postItem({
                    ref_id:ref_id,
                    ref_type:ref_type
                }))
            } catch (error) {
                window.alert(error);
                return;
            }
            setIsLiked(true)
        }
    },[]);

     return (
        <HeartContainer>
            <img src={isLiked? heart_active : heart } className="like_icon" onClick={onClick}></img>
        </HeartContainer>
     );
 };
 
 export default Heart;