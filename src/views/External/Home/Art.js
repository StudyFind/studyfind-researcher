import React from "react";
import styled from "styled-components";
import Table from "images/table.png";
function Art() {
  return (
    <Place>
      <Crop>
        <Image src={Table} />
      </Crop>
    </Place>
  );
}
const Place = styled.div``;
const Crop = styled.div`
  margin-top: 10px;

  overflow: hidden;
`;
const Image = styled.img`
  height: 300px;

  margin-top: -60px;
  margin-bottom: -15px;
  margin-left: -10px;
  @media only screen and (min-width: 1000px) {
    margin-top: -80px;
    height: 400px;
  } ;
`;
export default Art;
