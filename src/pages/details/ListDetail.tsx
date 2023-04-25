/** 
 * @Filename: ListDetail.js
 * @Description: 여행지, 숙소, 음식 리스트 클릭 시 보여질 상세페이지
 *               클릭된 리스트를 식별할 수 있도록
 *               props로 클릭된 리스트의 id를 ListDetail.js에 전달한다.
 */
import React from 'react';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import ReviewItem from '../../components/items/ReviewItem';
import Heart from '../../components/Heart';


const DetailContainer=styled.div`
    box-sizing: border-box;
    padding: 15px;
    width: 80%;
    margin: auto;
    
    .content_wrap{
        margin: 15px 0;

        .title_wrap{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title{
                
            }
        }

        .img_wrap{
            width: 100%;
            overflow: hidden;
            margin: 10px auto;
            
            img{
                object-fit: cover;
                height: 100%;
                width: 100%;
            }
            
        }
        .desc_wrap{
            h1{
                margin: 5px 0;
            }
            p{
                margin:20px 0;
            }
        }
        .review_wrap{
            margin: 10px auto;
        }
    }
`;

const ListDetail = () => {
    const location = useLocation();
    const { item } = location.state;
    const { data:loginData} = useSelector((state) => state.member); 

    let ref_id;
    let ref_type;
    
    if(item.place_no){
        ref_id = item.place_no;
        ref_type = 'place';
    }else if(item.accom_no){
        ref_id = item.accom_no;
        ref_type = 'accom';
    }else if(item.food_no){
        ref_id = item.food_no;
        ref_type = 'food';
    }
    
    /**컴포너트 마운트될때 해당 여행지(place_no/accom_no/food_no)에 등록된 리뷰글 목록 get요청 자동실행 */
    const [{data,loading,error},refetch] = useAxios({
        url:`/reviews/${ref_type}/${ref_id}`,
        method:'GET'
    },{useCache:false});
    // console.log(data.item);

    return (
        <DetailContainer>
            <div className='content_wrap'>
                <div className='title_wrap'>
                    <h1 className='font2'>{item.title}</h1>
                    {
                        loginData &&
                        <Heart className='heart' ref_id={ref_id} ref_type={ref_type} like_no={item.like_no}></Heart>
                    }
                </div>
                <div className='img_wrap'>
                    <img src={`${process.env.REACT_APP_STATIC_PATH}${item.image}`} alt="img" />
                </div>
                <div className='desc_wrap'>
                    <p className='font8' >{item.introduction}</p>
                    <h1 className='font9'>{item.address}</h1>
                    <h1 className='font9'>여행지 키워드<br/>{item.tag}</h1>
                </div>
            </div>
            <hr/>            
            <div className='review_wrap'>
                {
                    data && (
                        data.item.map((v,i)=>
                            <ReviewItem key={i} item={v}></ReviewItem>
                        ))
                }
            </div>    
        </DetailContainer>
    );
};

export default ListDetail;