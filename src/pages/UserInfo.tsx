/**
 * @FileName : UserInfo.js
 * @description : 회원정보수정_생년월일,이메일,프로필사진
 *                아이디,사용자이름은 변경 불가
 */

import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FormData from 'form-data';
import dayjs from "dayjs";
import profileNoImg from '../assets/icon/profile_man_1.png';


//리덕스관련 
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogin } from "../slices/MemberSlice";

const UserInfoContainer = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 30px;
    
    .userinfo_form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    .profile_img_wrap{
        padding: 10px 0;
        input{
            display: none;
        }
        img{
            display: block;
            background-color: tomato;
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }
    .input_area{
        width: 100%;
        .input_wrap{
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            input{
                height: 30px;
            }
        }
    }
}


    
`;


const UserInfo =()=>{
    const navigate = useNavigate();
    //UserInfo페이지 마운트될때 session에 저장되어 있는 로그인한 사용자의 회원정보 가져오기
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.member);
    
    // useEffect(()=>{
    //     dispatch(getIsLogin());
    // },[])
    // console.log(data);

    const onChangePreview = useCallback(()=>{
        console.log()
    },[]);

    //회원정보 변경사항 저장버튼 클릭이벤트
    const onSubmit = useCallback(async(e)=>{
        e.preventDefault();

        //사용자 입력값 변수저장
        const current = e.target;
        const birthday = current.birthday.value;
        const email = current.email.value;
        const profile_img = current.profile_img.files[0];

        //formData객체에 사용자 입력값 추가
        const formData = new FormData();
        formData.append("birthday", birthday);
        formData.append("email",email );
        formData.append("profile_img", profile_img);

        //formData객체는 console.log로 객체의 내용물을 출력해 확인 할 수 없다.
        //방법1.
        // for (var key of formData.entries()) {
		// 	console.log(key[0] + ':' + key[1])
		// }
        //방법2.
        // console.log(formData.get("birthday"))

        //회원정보의 일부만 변경진행_patch요청전송
        let json = null;
        try {
            json = await axios.patch('/members',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (error) {
            
        }
        dispatch(getIsLogin());
        alert('수정되었습니다.');
     
    },[]);

    return(
        data&&
        <UserInfoContainer>
            <form name="userinfo_form" className="userinfo_form" onSubmit={onSubmit}>
                <div className="input_wrap profile_img_wrap">
                    <label>
                        {
                            data.item.profile_img? 
                            <img src={`${process.env.REACT_APP_STATIC_PATH}${data.item.profile_img}`}  alt="profile_img"></img>
                            :
                            <img src={profileNoImg}></img>
                        }
                        <input type="file" name="profile_img" onChange={onChangePreview}></input>
                    </label>
                </div>
                <div className="input_area">
                    <div className="input_wrap">
                        <label>아이디</label>
                        <input name="userid" defaultValue={data.item.userid} disabled></input>
                    </div>
                    <div className="input_wrap">
                        <label>이름</label>
                        <input type="text" name="username" defaultValue={data.item.username} disabled></input>
                    </div>
                    <div className="input_wrap">
                        <label>생년월일</label>
                        <input type="date" name="birthday" defaultValue={dayjs(data.item.birthday).format("YYYY-MM-DD")}></input>
                    </div>
                    <div className="input_wrap">
                        <label>이메일</label>
                        <input type="text" name="email" defaultValue={data.item.email}></input>
                    </div>
                </div>
                <button >
                    저장하기
                </button>
            </form>
        </UserInfoContainer>
    )
}
export default UserInfo;