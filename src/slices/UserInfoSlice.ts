
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL='/login';

/*현재 로그인 계정의 회원정보 조회를 위한 비동기 함수 -> DB(X), 세션에 저장된 회원정보를 가져온다. */
export const getUserInfo = createAsyncThunk('UserInfoSlice/getUserInfo',async(payload,{rejectWithValue})=>{
    let result = null;
    try{
        result = await axios.get(URL);
    }
    catch(error){
        result = rejectWithValue(error.response);
    }
    return result;
});

//data : userid, username, birthday, email, profile_img, profile_thumb
const UserInfoSlice = createSlice({
    name:'userinfo',
    initialState: {
    data: null,         
    loading: false,     
    error: null        
    },
    reducers: {},
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getUserInfo.pending]: (state, { payload }) => {
            return {...state, loading: true }
        },
        [getUserInfo.fulfilled]: (state, { payload }) => {
            return {
                data: payload?.data,
                loading: false,
                error: null
            }
        },
        [getUserInfo.rejected]: (state, { payload }) => {
            return {
                data: null,
                loading: false,
                error: {
                    code: payload?.status ? payload.status : 500,
                    message: payload?.statusText ? payload.statusText : 'Server Error'
                }
            }
        }
    }//extraReduces end                                   
})

export default UserInfoSlice.reducer;