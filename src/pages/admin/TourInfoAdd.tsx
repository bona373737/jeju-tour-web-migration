import React, { useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import FormData from 'form-data';

const TourInfoAddContainer = styled.div`
    .input_wrap{
        margin: 10px 0;
        display: flex;
        flex-direction: column;
    }
`;

const TourInfoAdd =()=>{

    const onSubmit = useCallback(async(e)=>{
        e.preventDefault();

        /**사용자 입력값 변수저장 */
        const current = e.target
        const tourinfo = current.tourinfo.value;
        const title = current.title.value;
        const introduction = current.introduction.value;
        const sbst = current.sbst.value;
        const postcode = current.postcode.value;
        const address = current.address.value;
        const roadaddress = current.roadaddress.value;
        const phoneno = current.phoneno.value;
        const alltag = current.alltag.value;
        const tag = current.tag.value;
        const longitude = current.longitude.value;
        const latitude = current.latitude.value;
        const image = current.image.files[0];

        // const uploadFile = e.target.files[0]
        // formData.append('files',uploadFile)

        /**formData객체에 사용자입력값 추가*/
        let formData = new FormData();
        formData.set('tourinfo', tourinfo);
        formData.set("title", title );
        formData.append("introduction", introduction);
        formData.append("sbst",sbst );
        formData.append("postcode",postcode );
        formData.append("address",address );
        formData.append("roadaddress",roadaddress );
        formData.append("phoneno",phoneno );
        formData.append("alltag",alltag );
        formData.append("tag",tag );
        formData.append("longitude",longitude );
        formData.append("latitude",latitude );
        formData.append("image",image);
        
        //formData객체는 console.log로 객체의 내용물을 출력해 확인 할 수 없다.
        //방법1.
        // for (var key of formData.entries()) {
		// 	console.log(key[0] + ':' + key[1])
		// }
        //방법2.
        // console.log(formData.get("title"))

        
        /**여행지정보추가를 위한 post요청시 formData 전달 */
        let json = null;
        try {    
            json = await axios.post('http://localhost:3001/tourinfo',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            });
        
        } catch (error) {
            
        }

    },[])

    return(
        <TourInfoAddContainer>

            <form name="tourInfo_form" onSubmit={onSubmit}>
                <div className="input_wrap">
                    <label>여행지 분류</label>
                    <div>
                        <input type="radio" name="tourinfo" value="places"/>관광지
                        <input type="radio" name="tourinfo" value="accoms" />숙소
                        <input type="radio" name="tourinfo" value="foods"/>음식점
                    </div>
                </div>
                <div className="input_wrap">
                    <label>title</label>
                    <input type="text" name="title" id="title"></input>
                </div>
                <div className="input_wrap">
                    <label>introduction</label>
                    <input type="text" name="introduction" id="introduction"></input>
                </div>
                <div className="input_wrap">
                    <label>sbst</label>
                    <input type="text" name="sbst" id="sbst"></input>
                </div>
                <div className="input_wrap">
                    <label>postcode</label>
                    <input type="number" name="postcode" id="postcode"></input>
                </div>
                <div className="input_wrap">
                    <label>address</label>
                    <input type="text" name="address" id="address"></input>
                </div>
                <div className="input_wrap">
                    <label>roadaddress</label>
                    <input type="text" name="roadaddress" id="roadaddress"></input>
                </div>
                <div className="input_wrap">
                    <label>phoneno</label>
                    <input type="text" name="phoneno" id="phoneno"></input>
                </div>
                <div className="input_wrap">
                    <label>alltag</label>
                    <input type="text" name="alltag" id="alltag"></input>
                </div>
                <div className="input_wrap">
                    <label>tag</label>
                    <input type="text" name="tag" id="tag"></input>
                </div>
                <div className="input_wrap">
                    <label>longitude</label>
                    <input type="number" name="logitude" id="longitude"></input>
                </div>
                <div className="input_wrap">
                    <label>latitude</label>
                    <input type="number" name="latitude" id="latitude"></input>
                </div>
                <div className="input_wrap">
                    <label>image</label>
                    <input type="file" name="image" id="image"  accept="image/png, image/jpeg"></input>
                </div>
                <button>추가하기</button>
            </form>
        </TourInfoAddContainer>
    );
};
export default TourInfoAdd;
