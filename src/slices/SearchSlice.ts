/**
 * @Filename: SearchSlice.js
 * @Description: 검색어 데이터 처리
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from 'axios';

const URL = '/search/';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getSearchResult = createAsyncThunk('SearchSlice/getSearchResult', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(URL, {
            params: {
                keyword: payload.keyword,
            }
        });
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const SearchSlice = createSlice({
    name: 'search',
    initialState: {
        data: null,         
        loading: false,     
        error: null        
    },
    reducers: {},
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getSearchResult.pending]: pending,
        [getSearchResult.fulfilled]: fulfilled,
        [getSearchResult.rejected]: rejected,
    }
});

export default SearchSlice.reducer;