/**
 * @Filename: MyLikeSlice.js
 * @Description: 내저장 데이터를 불러오기
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from "axios";

const URL='/reviews';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getMyReviewList = createAsyncThunk('MyReviewSlice/getMyReviewList',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.get(URL);
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});

const MyReviewSlice = createSlice({
    name:'myReview',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:{
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getMyReviewList.pending]: pending,
        [getMyReviewList.fulfilled]: fulfilled,
        [getMyReviewList.rejected]: rejected,    
    }
})

export default MyReviewSlice.reducer;