/**
 * @Filename: FAQSlice.js
 * @Description: 자주 묻는 질문 데이터 처리
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from 'axios';

const URL = '/faq/';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getFAQList = createAsyncThunk('FAQSlice/getFAQList', async (payload, { rejectWithValue }) => {
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
export const getFAQItem = createAsyncThunk('NoticeSlice/getFAQItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(`${URL}${payload?.faq_no}/`);
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});


const FAQSlice = createSlice({
    name: 'faq',
    initialState: {
        data: null,         
        loading: false,     
        error: null        
    },
    reducers: {},
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getFAQList.pending]: pending,
        [getFAQList.fulfilled]: fulfilled,
        [getFAQList.rejected]: rejected,

        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getFAQItem.pending]: pending,
        [getFAQItem.fulfilled]: fulfilled,
        [getFAQItem.rejected]: rejected,
    }
});

export default FAQSlice.reducer;