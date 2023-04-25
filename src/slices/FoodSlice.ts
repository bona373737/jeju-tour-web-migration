/**
 * @Filename: PlaceSlice.js
 * @Description: 여행지 데이터를 불러오기
 */
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../Util";
import axios from "axios";
import {cloneDeep} from 'lodash';

//백엔드 구축하고 나면 url변경하기
const URL='/food';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getFoodList = createAsyncThunk('FoodSlice/getFoodList',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.get(URL,{
            params:{
                query:payload?.query,
                page:payload?.page,
                rows:payload?.rows
            },
            withCredentials: true
        });
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});

export const addFoodList = createAsyncThunk('FoodSlice/addFoodList',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.get(URL,{
            params:{
                query:payload?.query,
                page:payload?.page,
                rows:payload?.rows
            },
            withCredentials: true
        });
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});

const FoodSlice = createSlice({
    name:'food',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:{
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getFoodList.pending]: pending,
        [getFoodList.fulfilled]: fulfilled,
        [getFoodList.rejected]: rejected,

        [addFoodList.pending]: pending,
        [addFoodList.fulfilled]: (state, { payload }) => {
            // console.log(current(state.data.item)) //기존 data
            const originData = payload.data;
            const newItem = [...state.data.item.concat(...payload.data.item)];
            // for(let v of state.data.item){
            //     originData.item.unshift(v);
            // }
            originData.item = newItem
            // console.log(newItem);
            // console.log(originData);

            return {
                data: originData,
                loading: false,
                error: null
            }
        },
        [addFoodList.rejected]: rejected,
    }
})

export default FoodSlice.reducer;