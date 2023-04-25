/** 
 * @Filename: Header.js
 * @Description: 고정 헤더 영역
 */
import React, { memo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogin } from '../../slices/MemberSlice';

import Sidebar from "./Sidebar";
import Search from "./Search";
import Spinner from "../Spinner";

import Logo from "../../assets/icon/logo.png";
import SearchButton from "../../assets/icon/search.png";
import MenuButton from "../../assets/icon/menubutton.png";

const HeaderContainer = styled.div`
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
    background-color: var(--white);
    position: fixed;
    z-index: 10;

    .content_wrap {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 80%;
        height: 100%;
    
        h1 {
            text-indent: -9999em;
        }

        .logo_area {
            background-color: var(--white);
            justify-content: center;
            align-items: center;
            display: flex;
            height: 100%;

            .logo {
                height: 24px;
            }
        }

        .icons_area {
            background-color: var(--white);
            justify-content: center;
            align-items: center;
            display: flex;
            height: 100%;

            .search_button {
                height: 22px;
            }

            .menu_button {
                height: 22px;
                padding-left: 24px;
            }
        }
    }
`;

const Header = memo(() => {
    // sidebar 열림/닫힘 상태값
    const [showSidebar, setShowSidebar] = useState(false);
    // search popup 열림/닫힘 상태값
    const [isOpen, setIsOpen] = useState(false);
    // 리덕스 로그인 세션 상태 관리
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.member);

    /** 헤더 마운트 시, 로그인 여부 확인하기 */
    useEffect(() => {
        dispatch(getIsLogin());
    }, [dispatch]);

    /** 사이드바 열기/닫기 */
    // setter함수를 직접 변경
    // const toggleSidebar = useCallback(()=>setShowSidebar(!showSidebar),[showSidebar]);
    const toggleSidebar = useCallback(e => {
        e.preventDefault();
        setShowSidebar((showSidebar) => !showSidebar);
        setIsOpen((isOpen) => false);
    }, []);

    /** 검색창 열기 */
    const openSearch = useCallback(e => {
        e.preventDefault();
        setIsOpen(true);
        setShowSidebar((showSidebar) => false);
    }, []);

    /** 검색창 닫기 */
    const closeSearch = useCallback(e => {
        e.preventDefault();
        setIsOpen(false);
    }, []);

    return (
        <>
            <Spinner visible={loading} />

            <HeaderContainer>
                <div className="content_wrap">
                    <NavLink to="/">
                        <div className="logo_area">
                            <img className="logo" src={Logo} alt="logo" />
                            <h1>My Jeju</h1>
                        </div>
                    </NavLink>
                    <div className="icons_area">
                        <img
                            className="search_button"
                            src={SearchButton}
                            alt="search"
                            onClick={openSearch}
                        />
                        <h1>검색</h1>

                        <Search open={isOpen} setIsOpen={setIsOpen} close={closeSearch} />

                        <img
                            className="menu_button"
                            src={MenuButton}
                            alt="menu"
                            onClick={toggleSidebar}
                        />
                        <h1>☰</h1>
                    </div>
                </div>
                {showSidebar ? <Sidebar setShowSidebar={setShowSidebar}/> : ""}
            </HeaderContainer>
        </>
    );
});

export default Header;
