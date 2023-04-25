/**
 * @Filename: NoticeSlice.js
 * @Description: 공지사항 데이터 처리
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from 'axios';

const URL = '/notice/';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getNoticeList = createAsyncThunk('NoticeSlice/getNoticeList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(URL, {
            params: {
                type: payload?.type,
                query: payload?.query,
                page: payload?.page,
                rows: payload?.rows
            }
        });
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getNoticeItem = createAsyncThunk('NoticeSlice/getNoticeItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(`${URL}${payload?.notice_no}/`);
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const NoticeSlice = createSlice({
    name: 'notice',
    initialState: {
        data: null,         
        loading: false,     
        error: null        
    },
    reducers: {},
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getNoticeList.pending]: pending,
        [getNoticeList.fulfilled]: fulfilled,
        [getNoticeList.rejected]: rejected,

        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getNoticeItem.pending]: pending,
        [getNoticeItem.fulfilled]: fulfilled,
        [getNoticeItem.rejected]: rejected,
    }
});

export default NoticeSlice.reducer;