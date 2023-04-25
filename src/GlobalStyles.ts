/**
 * @Filename: GlobalStyles.js
 * @Description: 전역으로 적용할 Global Style 정의
 */
import { createGlobalStyle } from 'styled-components';

/**기본스타일 reset*/
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${ reset };
    
    *{
        margin: 0;
        padding: 0;
    };
    
    html { 
        font-family: ‘SUIT’, sans-serif;
        font-size: 12px;
    };
    
    a { 
        font-family: inherit;
        color: #000;
        text-decoration: none;
    };

    /* button 기본 스타일 */
    button { 
        border: 0;
        font-family: inherit;
    };
    // button 활성화
    .btn_act {
        font-size: 16px;
        width: 100%;
        height: 2.4em;
        border: none;
        border-radius: 4px;
        color: var(--white);
        background-color: var(--blue);
    };
    // button 비활성화
    .btn_dis {
        font-size: 16px;
        width: 100%;
        height: 2.4em;
        border: none;
        border-radius: 4px;
        color: var(--textgray);
        background-color: var(--subgray);
    };
    
    /* input 기본 스타일 */
    input { 
        font-family: inherit;
        border: solid 1px var(--subgray);
        border-radius: 4px;
        caret-color: var(--blue);
    };
    /* select 기본 스타일 */
    select {
        font-family: inherit;
        appearance: none;
        -moz-appearance: none; // Firefox
        -webkit-appearance: none; // Safari & Chrome
        border: solid 1px var(--subgray);
        border-radius: 4px;
    };
    /* select 기본 스타일 */
    select::-ms-expand {
        font-family: inherit;
        display: none; // IE 10, 11
        border: solid 1px var(--subgray);
        border-radius: 4px;
    };
    /* input & select 포커싱 */
    input:focus,
    select:focus { outline-color: var(--blue); };
    
    :root {
        // Point, Button, Icon
        --blue : #0058FF;

        // Icon 
        --subblue: #7E84A3;
        
        // Tab Icon
        --gray: #9E9E9D;
        
        // Tab Color
        --sky : #E5EEFF;
        
        // Tag, Line 
        --subgray : #E0E0E0;

        // Back Wall
        --subsky : #F4F7FC;
        
        // 본문 Text
        --textgray : #595959;

        // 본문 Text
        --black : #000;

        // White Text
        --white : #fff;

        // Notification
        --red : #F0142F;
    };

    // 36px 추천 테마 페이지 장소 이름 넣을 때 적용
    .font1 {
        font-weight: 200;
        font-size: 3rem;
    };

    // 24px 프로필 이름, 회원가입 제목, 로그인 제목 등
    .font2 {
        font-weight: 600;
        font-size: 2rem;
        letter-spacing: -0.1rem;
    };

    // 18px
    .font3 {
        font-weight: 800;
        font-size: 1.5rem;
        letter-spacing: -0.1rem;
    };

    // 18px 컨텐츠 설명글
    .font4 {
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 0.75cm;
    };

    // 16px
    .font5 {
        font-weight: 600;
        font-size: 1.3rem;
    };

    // 16px
    .font6 {
        font-weight: 400;
        font-size: 1.3rem;
    };

    // 16px 내 리뷰, 공지사항 설명글
    .font7 {
        font-weight: 400;
        font-size: 1.3rem;
        line-height: 0.7cm;
    };

    // 14px
    .font8 {
        font-weight: 600;
        font-size: 1.15rem;
    };

    // 14px
    .font9 {
        font-weight: 400;
        font-size: 1.15rem;
    };
`;

export default GlobalStyles;
