import React from "react";
import styled from "styled-components";
import Linkedin from "images/linkedin.png";
function Biography(props) {
  return (
    <Place>
      <Title>{props.name}</Title>
      <Crop>
        <Image src={props.image} />
      </Crop>
      <Text>{props.major}</Text>

      <Text>{props.alma}</Text>
      <a href={props.link} target="_blank" rel="noreferrer noopener">
        <Click>
          {" "}
          <Icon src={Linkedin} />
          {props.name}
        </Click>
      </a>
    </Place>
  );
}
const Text = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 500;
  font-family: "Avenir", "Helvetica", sans-serif;
`;
const Title = styled(Text)`
  font-size: 25px;
  margin-top: 0px;
  font-weight: bold;
  @media only screen and (max-width: 330px) {
    font-size: 23px;
  } ;
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
  border-radius: 50%;
  @media only screen and (max-width: 330px) {
    width: 130px;
    height: 130px;
  } ;
`;
const Image = styled.img`
  display: inline;
  height: 166%;
  z-index: -1;
`;
const Icon = styled.img`
  height: 10px;
  margin: 6px;
  position: relative;
  filter: grayscale(100%);
`;
const Click = styled.button`
  border: 1px solid transparent;
  color: #77838f;
  font-weight: 600;
  margin-top: 10px;
  background: rgba(119, 131, 143, 0.1);
  transition: all 0.2s ease-in-out;
  padding: 10px;
  display: flex;
  margin: auto;
  margin-top: 10px;
  &:hover {
    color: #fff;
    background-color: #77838f;
    cursor: pointer;
  }

  border-radius: 3px;
`;
const Place = styled.div`
  margin: 10px 40px;
  background-color: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  padding: 20px 0px;
  @media only screen and (min-width: 768px) {
    margin: 20px;
  } ;
`;
export default Biography;
