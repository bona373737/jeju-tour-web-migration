/**
 * @Filename: MyLikeSlice.js
 * @Description: 내저장 데이터를 불러오기
 */
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from "axios";
import {cloneDeep} from 'lodash';


const URL='/likes';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getMyLikeList = createAsyncThunk('MyLikeSlice/getMyLikeList',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.get(URL);
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});

export const deleteMyLikeItem = createAsyncThunk('MyLikeSlice/deleteMyLikeItem',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.delete(`${URL}/${payload.like_no}`);
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});

export const postItem = createAsyncThunk('MyLikeSlice/postItem',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.post(URL,{
            ref_id : payload.ref_id,
            ref_type : payload.ref_type
        });
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});


const MyLikeSlice = createSlice({
    name:'myLike',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:{
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getMyLikeList.pending]: pending,
        [getMyLikeList.fulfilled]: fulfilled,
        [getMyLikeList.rejected]: rejected,  
        
        [postItem.pending]: pending,
        [postItem.fulfilled]: fulfilled,
        [postItem.rejected]: rejected,  

        // [deleteMyLikeItem.pending]: pending,
        // [deleteMyLikeItem.fulfilled]: fulfilled,
        // [deleteMyLikeItem.rejected]: rejected,  
        
        // [postItem.pending]: pending,
        // [postItem.fulfilled]: (state, {meta,payload})=>{
        //     //원본데이터 복사
        //     const data = cloneDeep(state.data);
        //     console.log("좋아요 추가");
        //     // console.log(data)
        //     //추가된 데이터를 기존 상태값 data의 맨 앞에 추가
        //     data.item.unshift(payload.data.item);

        //     //한페이지에 보여지는 개수를 동일하게 유지시키기 위해 
        //     //기존 상태값 배열에서 맨 마지막 항목은 삭제처리
        //     data.item.pop();

        //     //원본 데이터에 추가된 데이터를 추가시켜 반환하기
        //     return{
        //         data: data,
        //         loading: false,
        //         error: null
        //     }
        // },
        // [postItem.rejected]: rejected,   
        
        // /** 데이터 삭제를 위한 액션함수 */
        [deleteMyLikeItem.pending]: pending,
        [deleteMyLikeItem.fulfilled]: (state, {meta,payload})=>{
            //기존의 상태값(data) 깊은복사
            // console.log(current(state)) //기존 data
            const data = cloneDeep(state.data);
            console.log("좋아요 삭제");
            // console.log(data);

            //기존의 데이터에서 삭제가 요청된 항목의 위치를 검색한다.
            const index = data.item.findIndex(element=>element.like_no === parseInt(meta.arg.like_no));
            //console.log(index);

            // 검색이 되었다면 해당 항목을 삭제한다.
            if(index !== undefined){
                data.item.splice(index,1);
            }
            // console.log(data);

            // redux store의 기존 원본data에서 삭제요청한 해당 데이터 하나만 삭제처리 후 나머지 데이터 그대로 반환
            return{
                data:data,
                loading:false,
                error: null
            }
        },
        [deleteMyLikeItem.rejected]: rejected, 
    }
})

export default MyLikeSlice.reducer;