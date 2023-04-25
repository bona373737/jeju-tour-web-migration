/** 
 * @Filename: TabArea.js
 * @Description: 헤더 영역 아래 여행지, 숙소, 음식 탭 버튼 영역
 */
import React, { memo, useCallback } from "react";
import TabBtn from "./buttons/TabBtn";
import styled from "styled-components";

import TravelIcon from "../assets/icon/pin.png";
import HotelIcon from "../assets/icon/hotel.png";
import FoodIcon from "../assets/icon/food.png";
import TravelIconAct from "../assets/icon/pin_active.png";
import { NavLink } from "react-router-dom";
import HotelIconAct from "../assets/icon/hotel_active.png";
import FoodIconAct from "../assets/icon/food_active.png";

const TabAreaContainer = styled.div`
    box-sizing: border-box;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
    background-color: var(--white);
    width: 100%;
    height: 70px;
    z-index: 9;

    .tab_area {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 80%;
        height: 100%;

        .tab {
            width: 33.33333%;
            justify-content: center;
            align-items: center;

            a{
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                height: 100%;
                color: var(--gray);
                &:active{
                    background-color: var(--sky);
                    color: var(--blue);
                }
                .line {
                        background-color: var(--subgray);
                        width: 100%;
                        margin: 0 auto;
                        margin-top: 20px;
                        height: 0.4vh;
                        /* position: relative;
                        top: 80%; */
                    }
                span {
                    padding-left: 8px;
                }
                .travel_icon {
                    height: 24px;
                }
    
                .hotel_icon, .food_icon {
                    height: 22px;
                }
            }
        }
    }
`;

const TabArea = memo(() => {    
    return (
        <TabAreaContainer>
            <div className="tab_area">
                <div className="tab">
                    <NavLink to="/tab/place" style={({ isActive }) => isActive ? {color:"#0058FF"} : {color:"#9E9E9D"}}>
                            {
                            ({isActive})=>(
                                <>
                                <div>
                                    <img
                                        className="travel_icon"
                                        src={isActive? TravelIconAct:TravelIcon}
                                        alt="travelicon"
                                        />
                                    <span className="font5">여행지</span>
                                    </div>
                                <div className="line"></div>
                                </>
                            )}
                    </NavLink>
                </div>

                <div className="tab">
                    <NavLink to="/tab/accom" style={({ isActive }) => isActive ? {color:"#0058FF"} : {color:"#9E9E9D"}}>
                    {
                        ({isActive})=>(
                            <>
                            <div>
                                <img
                                    className="hotel_icon"
                                    src={isActive? HotelIconAct:HotelIcon}
                                    alt="hotelicon"
                                    />
                                <span className="font5">숙소</span>
                                </div>
                            <div className="line"></div>
                
                            </>
                    )}
                    </NavLink>
                </div>

                <div className="tab">
                    <NavLink to="/tab/food" style={({ isActive }) => isActive ? {color:"#0058FF"} : {color:"#9E9E9D"}}>
                    {
                        ({isActive})=>(
                            <>
                                <div>
                                    <img
                                        className="food_icon"
                                        src={isActive? FoodIconAct:FoodIcon}
                                        alt="foodicon"
                                        />
                                    <span className="font5">음식</span>
                                </div>
                                <div className="line"></div>
                            </>
                    )}
                    </NavLink>
                </div>
            </div>
        </TabAreaContainer>
    );
});

export default TabArea;
