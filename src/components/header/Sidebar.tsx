/** 
 * @Filename: Sidebar.js
 * @Description: 사이드바 영역
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLogin } from '../../slices/MemberSlice';
import axios from 'axios';

import Spinner from '../Spinner';

//아이콘
import profileNoImg from '../../assets/icon/profile_man_1.png';
import cogwheel from '../../assets/icon/cogwheel.png';
import icon_heart from '../../assets/icon/heart.png';
import icon_review from '../../assets/icon/review.png';
import icon_mail from '../../assets/icon/mail.png';
import icon_tools from '../../assets/icon/tools.png';
import icon_logout from '../../assets/icon/logout.png';
import icon_qna from '../../assets/icon/qna.png';

const fadeIn = keyframes`
    from{
        transform: translateX(100%);
    }
    to{
        transform: translateX(0);
    }
`;

const SidebarContainer = styled.div`
    width: 100%;
    height: 97vh;
    position: absolute;
    top: 7vh;
    background-color: rgba(255,255,255,0);
    z-index: 80;
    animation: ${fadeIn} 0.3s;

    .sidebar_content{
        box-sizing: border-box;
        width: 70%;
        margin-left: 30%;
        height: 97vh;

        background-color: var(--white);
        padding: 20px 20px;
        .back{
            width: 100%;
            
            background-color: black;
        }
        .login{
            background-color: white;
            height: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .user_inform{
            background-color: white;
            height: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
            .profile_wrap{
                display: flex;
                justify-content: space-between;
                .profile_img{
                    background-color: tomato;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                }
                }
                .profile_text{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center; 
                }
            }
            .icon_cogwheel_wrap{
                height: 100%;
                padding-left: 10px;
                .icon_cogwheel{
                    width: 22px;
                }
            }
        }
        .menu{
            margin: 15px 0;
            li{
                display: block;
                width: 100%;
                padding: 15px 0;
                span{
                    display: inline-block;
                    background-color: red;
                    border-radius: 5px;
                    width: 20px;
                    text-align: center;
                    color: white;
                    margin-left: 5px;
                }
                img{
                    width: 20px;
                    filter: invert(75%) sepia(4%) saturate(75%) hue-rotate(22deg) brightness(85%) contrast(86%);
                }
            }//li end
        }//menu end
    }//sidebar_content end
`;

const Sidebar = ({setShowSidebar}) => {
    // 페이지 강제 이동 함수 생성
    const navigate = useNavigate();
    // 리덕스 로그인 세션 상태 관리
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.member);
    const { data:myLikeData} = useSelector((state)=> state.myLike);
    // 로그인 여부 상태값
    const [isLogin, setIsLogin] = useState();
    // 로그인 회원정보 상태값
    const [user, setUser] = useState({
        profile_img: '',
        userid: ''
    });


    /** 로그인 상태값 갱신 */
    useEffect(() => {
        if (data && data.item) {
            setIsLogin(true);
            setUser({
                profile_img: data.item.profile_img,
                userid: data.item.userid,
            });
        } else {
            setIsLogin(false);
        }
    }, [data]);

    /** logout 버튼 클릭 이벤트 */
    const logout = useCallback(e => {
        e.preventDefault();
        // 리덕스를 통해 로그아웃 요청
        dispatch(deleteLogin())
        .unwrap()
        .then(() => {
            // 로그아웃 성공 시
            navigate('/');
            setShowSidebar(false);
            setIsLogin(false);
            setUser(null);
        })
        .catch(() => {
            // 로그아웃 실패 시
            alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
        });
    }, [dispatch, navigate, setShowSidebar]);

    /** 클릭시 페이지이동과 함께 sidebar닫아주는 함수 */
    const movePage=useCallback(e => {
        e.preventDefault();
        navigate(e.target.dataset.path);
        setShowSidebar(false);
    }, [navigate, setShowSidebar]);

    /** 클릭시 페이지이동과 함께 sidebar닫아주는 함수 + 비회원접속제한 */
    const movePage2=useCallback(e => {
        e.preventDefault();
        if(isLogin) { // 로그인 상태
            navigate(e.target.dataset.path);
            setShowSidebar(false);
        } else { // 로그아웃 상태
            alert("로그인을 해주세요.");
            navigate("/login");
            setShowSidebar(false);
        }
    }, [isLogin, navigate, setShowSidebar]);

    return (
        <>
            <Spinner visible={loading}/>

            <SidebarContainer>
                <div className="sidebar_content">
                <div className="back"></div>
                {
                    // 로그인 여부에 따라 조건부 렌더링
                    isLogin ? ( 
                        <div className="user_inform" >
                            <div className='profile_wrap'>

                           
                            <div className='profile_img'>
                                {
                                    user.profile_img?
                                    <img src={`${process.env.REACT_APP_STATIC_PATH}${user.profile_img}`} alt="img" />
                                    :
                                    <img src={profileNoImg}/>
                                }
                            </div>
                            <div className="profile_text">
                                <h1 className="font2">Hello,</h1>
                                <h1 className="font2">{user.userid}!</h1>
                            </div>
                            </div>
                            <div className='icon_cogwheel_wrap'>
                                <img src={cogwheel} className="icon_cogwheel" data-path="/userinfo" onClick={movePage}></img>
                            </div>
                        </div>
                    ) : (<div className='login' data-path='/login' onClick={movePage}>로그인/회원가입</div>)}
                {/* menu 링크 */}
                <ul className='menu'>
                <li onClick={movePage2} data-path='/mylike'><img src={icon_heart}/>내 저장<span>{myLikeData?.item?.length}</span></li>
                <li onClick={movePage2} data-path='/myreview'><img src={icon_review}/>내 리뷰</li>
                {/* <li onClick={movePage2} data-path='/myqna'><img src={icon_mail}/>내 문의</li> */}
                {/* <li onClick={movePage} data-path='/tourkit'><img src={icon_tools}/>여행도구</li> */}
                <li onClick={movePage} data-path='/service'><img src={icon_qna}/>고객센터</li>
                {/* 로그인 여부에 따라 조건부 렌더링 */}
                {isLogin && <li><button type="button" name="logout" className="logout" onClick={logout}><img src={icon_logout}/>로그아웃</button></li>}
                </ul>
                </div>
            </SidebarContainer>
        </>
    );
}; 

export default Sidebar;