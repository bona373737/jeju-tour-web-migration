/**
 * @Filename: ErrorView.js
 * @Description: 에러 화면 컴포넌트
 */
import React from 'react';
import styled from "styled-components";

const ErrorContainer = styled.div`
    text-align: center;
    .code {
        padding: 15%;
    }
    .msg {
        padding-bottom: 12%;
    }
`;

const ErrorView = ({error}) => {
    return (
        <ErrorContainer>
            <div className="code font3">{error.code} Error</div>
            <div className="msg font4">{error.message}</div>
        </ErrorContainer>
    );
};

export default ErrorView;