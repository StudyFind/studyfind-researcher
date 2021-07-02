import React from "react";
import styled from "styled-components";
function Info(props) {
  return (
    <Bio>
      {/* FIX/REMOVE INLINE */}
      <Crop>
        <Image
          src={props.image}
          style={{
            right: `${props.right}`,
            bottom: `${props.bottom}`,
            height: `${props.height}`,
          }}
        />
      </Crop>
      <Title>{props.name}</Title>
    </Bio>
  );
}
const Bio = styled.div`
  margin: 30px 0;
  z-index: 99;
`;
const Crop = styled.div`
  position: relative;
  height: 166%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border: 2px black solid;
  border-radius: 50%;
`;

const Title = styled.p`
  text-align: center;
  font-weight: bold;
`;
const Image = styled.img`
  display: inline;
  height: 165%;
  position: relative;
  z-index: -1;
`;
export default Info;
