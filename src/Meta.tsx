/**
 * @Filename: Meta.js
 * @Description: SEO 처리 컴포넌트
 */
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = (props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        {/* SEO 태그 */}
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={props.url} />
        {/* <meta property='og:image' content={props.image} /> */}

        {/* 웹폰트 적용을 위한 외부 리소스 참조 */}
        <link
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
          rel="stylesheet"
        />
      </Helmet>
    </HelmetProvider>
  );
};

// props에 대한 기본값 설정
Meta.defaultProps = {
  title: "Jeju Tour Web - Team Project",
  description: "React.js로 구현한 제주 여행 모바일 웹 페이지 입니다.",
  keywords: "React, team, portfolio, demo, mobile, web, jeju, tour, travel",
  author: "Jaei, Bona, Narae",
  // image: '기본이미지변수적용',
  url: window.location.href,
};

export default Meta;
