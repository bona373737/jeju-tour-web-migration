import React, { useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const NoticeAddContainer = styled.div`
    width: 100%;
    text-align: center;
    
    .admin {
        margin: 50px 0;
    }
    
    form {
        display: flex;
        flex-flow: column wrap;

        .input_text {
            margin: 10px auto;
            padding: 10px 10px;
            width: 300px;
        }

        button {
            margin: 50px auto 0;
            padding: 10px;
            width: 100px;
        }
    }
`;

const NoticeAdd = () => {
    /** 입력 내용 전송하기 */ 
    const onSubmit = useCallback(async(e) => {
        e.preventDefault();

        // input 입력값 가져오기
        const current = e.target;
        const title = current.title.value;
        const content = current.content.value;
        const reg_date = current.reg_date.value;
        const edit_date = current.edit_date.value;

        try {
            const response = await axios.post('/notice', {
                title: title,
                content: content,
                reg_date: reg_date,
                edit_date: edit_date,
            });
            window.alert(`${response.data.item.notice_no}번째 공지사항 등록 완료`);
        } catch (err) {
            const errorMsg = '[' + err.response.data.rt + '] ' + err.response.data.rtmsg;
            window.alert(`${errorMsg}`);
        }
    }, []);

    return (
        <NoticeAddContainer>
            <h1 className="admin font1">공지사항 등록 페이지</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="title" className="input_text" placeholder="제목"></input>
                <textarea name="content" className="input_text" placeholder="내용"></textarea>
                <input type="datetime-local" name="reg_date" className="input_text"></input>
                <input type="datetime-local" name="edit_date" className="input_text"></input>
                <button type="submit">등록하기</button>
            </form>
        </NoticeAddContainer>
    );
};

export default NoticeAdd;