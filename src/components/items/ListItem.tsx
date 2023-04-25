/** 
 * @Filename: ListItem.js
 * @Description: 여행지, 숙소, 음식 데이터 리스트 아이템 컴포넌트
 *               클릭된 리스트를 식별할 수 있도록
 *               props로 클릭된 리스트의 id를 ListDetail.js에 전달한다.
 */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Heart from '../Heart';

const ListItemContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 15px 0;
    line-height: 20px;

    a{
        display: flex;

        .img_wrap{
            width: 30%;
            /* background-color: var(--blue); */
            overflow: hidden;
            margin: 0 auto;
            img{
                object-fit: cover;
                height: 100%;
                width: 100%;
            }

        }
        .text_wrap{
            width: 70%;
            margin-left: 5px;
            .introduction{
                line-height: 20px;
                white-space: normal;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

        }

    }
`;

const ListItem = ({item,api}) => { 
    // let id;
    // if(item){
    //     id = item?.place_no? item.place_no : (item.accom_no? item.accom_no : item.food_no);
    // }
    let ref_id;
    let ref_type;
    let like_no= item.like_no;
    if(item.place_no){
        // console.log(item.place_no)
        ref_id=item.place_no;
        ref_type='place';
    }else if(item.accom_no){
        ref_id=item.accom_no;
        ref_type='accom';
    }else if(item.food_no){
        ref_id=item.food_no;
        ref_type='food';
    }
    // console.log(ref_type)
    
    return (
        item&&
        <ListItemContainer>
            <NavLink to={'/tab/'+api+'/'+ref_id} state={{item:item}}>
                <div className='img_wrap'>
                    <img src={`${process.env.REACT_APP_STATIC_PATH}${item.image}`} alt="img" />
                </div>
                <div className='text_wrap'>
                    <p className='font3'>{item.title}</p>
                    <p className='font8'>{item.address}</p>
                    <p className='font8'>{item.phoneno}</p>
                    <p className='font8 introduction'>{item.introduction}</p>
                </div>
                {
                    item.hasOwnProperty("like_no") &&
                    <Heart ref_id={ref_id} ref_type={ref_type} like_no={like_no}></Heart>
                }
            </NavLink>
        </ListItemContainer>
    );
};

export default ListItem;