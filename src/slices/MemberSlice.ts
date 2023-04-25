/**
 * @Filename: MemberSlice.js
 * @Description: 회원 로그인/아웃 상태 관리
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from 'axios';

const URL = '/session/login/';

/** 회원 로그인 여부 검사를 위한 비동기 함수 */
export const getIsLogin = createAsyncThunk('MemberSlice/getIsLogin', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(URL);
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 회원 로그인을 위한 비동기 함수 */
export const postLogin = createAsyncThunk('MemberSlice/postLogin', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.post(URL, {
            userid: payload.userid,
            password: payload.password
        });
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 회원 로그아웃을 위한 위한 비동기 함수 */
export const deleteLogin = createAsyncThunk('MemberSlice/deleteLogin', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.delete(URL);
    } catch(err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const MemberSlice = createSlice({
    name: 'member',
    initialState: {
        data: null,         
        loading: false,     
        error: null        
    },
    reducers: {},
    extraReducers: {
        /** 회원 로그인 여부 검사를 위한 액션 함수 */
        [getIsLogin.pending]: pending,
        [getIsLogin.fulfilled]: fulfilled,
        [getIsLogin.rejected]: rejected,
        /** 회원 로그인을 위한 액션 함수 */
        [postLogin.pending]: pending,
        [postLogin.fulfilled]: fulfilled,
        [postLogin.rejected]: rejected,
        /** 회원 로그아웃을 위한 액션 함수 */
        [deleteLogin.pending]: pending,
        [deleteLogin.fulfilled]: fulfilled,
        [deleteLogin.rejected]: rejected,
    }
});

export default MemberSlice.reducer;