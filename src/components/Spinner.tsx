/**
 * @Filename: Spinner.js
 * @Description: react-loader-spinner 라이브러리 활용 로딩바 구현
 * @Reference: https://mhnpd.github.io/react-loader-spinner/
 * @Install: yarn add react-loader-spinner
 */
import React from "react";
import PropsTypes from "prop-types";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";

const TransLayer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: #0003;
  width: 100%;
  height: 100%;
`;

const Spinner = ({ visible, color, width, height }) => {
  return (
    <div>
      {visible && (
        <TransLayer>
          <Grid
            height={height}
            width={width}
            color={color}
            ariaLabel="loading-indicator"
            wrapperStyle={{
              position: "absolute",
              zIndex: "50%",
              left: "50%",
              top: "50%",
              marginLeft: -width / 2 + "px",
              marginTop: -height / 2 + "px",
            }}
          />
        </TransLayer>
      )}
    </div>
  );
};

Spinner.defaultProps = {
  visible: false,
  color: "#06f",
  width: 100,
  height: 100,
};

Spinner.PropsTypes = {
  visible: PropsTypes.bool.isRequired,
  color: PropsTypes.string,
  width: PropsTypes.number,
  height: PropsTypes.number,
};

export default Spinner;
