import React from "react";
import styled from "styled-components";
import logo from "images/logo.jpg";
import { Link } from "react-router-dom";
import Info from "./Info";
import Yohan from "images/Founders/Yohan.jpg";
import Andrew from "images/Founders/Andrew.jpg";
import Vir from "images/Founders/Vir.jpg";
import Romina from "images/Advisory/Romina.png";
import Reina from "images/Advisory/Reina.png";
import Suraj from "images/Advisory/Suraj.png";
import Evans from "images/Advisory/Evans.png";
import Aidan from "images/Advisory/Aidan.png";
import Ayesha from "images/Advisory/Ayesha.png";
import Alexis from "images/Advisory/Alexis.png";
import Hannah from "images/Advisory/Hannah.png";
import Gabi from "images/Advisory/Gabi.png";
import Steven from "images/Advisory/Steven.png";
import Talia from "images/Advisory/Talia.png";
import Jeremy from "images/Interns/Jeremy.png";
import Wendy from "images/Interns/Wendy.png";
import David from "images/Interns/David.png";
import Keely from "images/Interns/Keely.png";
import Wenkai from "images/Interns/Wenkai.png";
import Gustavo from "images/Interns/Gustavo.png";
import Yuyao from "images/Interns/Yuyao.png";
import Michael from "images/Interns/Michael.png";
import Steven_ from "images/Interns/Steven_.png";
import Jonathon from "images/Interns/Jonathon.png";
import Placeholder from "images/Interns/Placeholder.png";
import Linkedin from "images/linkedin.png";
import Facebook from "images/facebook.png";
import Youtube from "images/youtube.png";
import Instagram from "images/instagram.png";

function Team() {
  return (
    <Website>
      <Top>
        <a href="https://researcher.studyfind.org/auth">
          <Start>Start Now</Start>
        </a>
        <Link to="/">
          <Image src={logo} />
        </Link>
      </Top>
      <Section>
        <BG1>
          <BigHeader>Meet Our Team</BigHeader>
          <Header>Founding Team</Header>
          <Row>
            <Info name="Yohan Jhaveri" image={Yohan} right="10px" />
            <Info name="Andrew Garcia" image={Andrew} />
            <Info name="Vir Mittal" image={Vir} />
          </Row>
        </BG1>
        <BG2>
          <Header>National Advisory Board</Header>
          <Row>
            <Info name="Romina" image={Romina} right="30px" bottom="20px" />
            <Info name="Reina" image={Reina} bottom="10px" />
            <Info name="Suraj" image={Suraj} right="0px" bottom="10px" height="140%" />
          </Row>
          <Row>
            <Info name="Evans" image={Evans} right="50px" bottom="50px" />
            <Info name="Aidan" image={Aidan} />
            <Info name="Ayesha" image={Ayesha} right="30px" bottom="10px" />
          </Row>
          <Row>
            <Info name="Alexis" image={Alexis} right="10px" />
            <Info name="Hannah" image={Hannah} right="20px" />
            <Info name="Gabi" image={Gabi} right="60px" />
          </Row>
          <Row>
            <Info name="Steven" image={Steven} right="30px" bottom="20px" height="140%" />
            <Info name="Talia" image={Talia} right="90px" height="140%" />
          </Row>
        </BG2>
        <BG3>
          <Header>Interns</Header>
          <Row>
            <Info name="Jeremey" image={Jeremy} right="30px" bottom="10px" />
            <Info name="Wendy" image={Wendy} right="100px" />
            <Info name="David" image={David} right="10px" bottom="40px" />
          </Row>
          <Row>
            <Info name="Keely" image={Keely} right="30px" height="140%" />
            <Info name="Wenkai" image={Wenkai} />
            <Info name="Yuyao" image={Yuyao} right="10px" bottom="10px" />
          </Row>
          <Row>
            <Info name="Steven" image={Steven_} right="165px" bottom="20px" />
            <Info name="Jonathon" image={Jonathon} right="40px" bottom="0px" height="110%" />
            <Info name="Liang" image={Placeholder} right="36px" bottom="20px" height="150%" />
          </Row>

          <Row>
            <Info name="Eric" image={Placeholder} right="36px" bottom="20px" height="150%" />
            <Info name="Ivan" image={Placeholder} right="36px" bottom="20px" height="150%" />
            <Info name="Jason" image={Placeholder} right="36px" bottom="20px" height="150%" />
          </Row>
        </BG3>
        <BG4>
          <Header>Notable Alumni</Header>
          <Row>
            <Info name="Michael" image={Michael} right="10px" bottom="30px" />
            <Info name="Gustavo" image={Gustavo} right="40px" bottom="10px" />
            <Info name="Mikolaj" image={Placeholder} right="36px" bottom="20px" height="150%" />
          </Row>
          <Row>
            <Info name="Ziyao" image={Placeholder} right="36px" bottom="20px" height="150%" />
          </Row>
        </BG4>
      </Section>
      <Bottom>
        <Feed>
          Feedback<Question>?</Question>
        </Feed>
        <Socials>
          <a href="https://www.linkedin.com/company/studyfind/">
            <Icon src={Linkedin} />
          </a>
          <a href="https://www.facebook.com/studyfindco/">
            <Icon src={Facebook} />
          </a>
          <a href="https://www.youtube.com/channel/UCqOfwBbtyfMg-Hog0tj30qQ">
            <Icon src={Youtube} />
          </a>
          <a href="https://www.instagram.com/studyfindco/">
            <Icon src={Instagram} />
          </a>
        </Socials>
      </Bottom>
    </Website>
  );
}
const Website = styled.div``;
const Top = styled.div`
  padding-top: 2px;
  height: 50px;
  border-bottom: 2px rgb(57 76 96 / 15%) solid;
  position: fixed;
  top: 0;
  width: 100vw;
  background: white;
  box-shadow: 0 2px 8px rgba(57 76 96 / 15%);
  z-index: 100;
`;

const Section = styled.div`
  position: relative;
  top: 20px;
`;
const BG1 = styled.div`
  background: #88dbdc;
  padding: 20px 0;
  z-index: 0;
  border-bottom: 3px black solid;
  transition: background-color 0.5s;
  &:hover {
    background: #ffb48f;
  }
`;
const BG2 = styled.div`
  background: #ff652f;
  z-index: 0;
  padding: 20px 0;
  border-bottom: 3px black solid;
  transition: background-color 0.5s;
  &:hover {
    background: #65ccb8;
  }
`;
const BG3 = styled.div`
  background: #88dbdc;
  z-index: 0;
  padding: 20px 0;
  border-bottom: 3px black solid;
  transition: background-color 0.5s;
  &:hover {
    background: #ffb48f;
  }
`;
const BG4 = styled.div`
  background: #ff652f;
  z-index: 0;
  padding: 20px 0;
  transition: background-color 0.5s;
  &:hover {
    background: #65ccb8;
  }
`;
const Row = styled.div`
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const Bottom = styled.div`
  color: white;
  position: relative;
  top: 20px;

  height: 25px;
  padding: 5px;
  background: rgb(55, 125, 255);
`;
const Question = styled.div`
  color: rgb(55, 125, 255);
  height: 18px;
  width: 18px;
  margin-left: 5px;
  margin-top: 1px;
  text-align: center;
  border-radius: 50%;
  background: white;
`;
const Feed = styled.div`
  display: flex;
`;
const Socials = styled.div`
  position: relative;
  float: right;
  bottom: 18px;
  right: 20px;
`;
const BigHeader = styled.h1`
  text-align: center;
  color: rgb(32, 201, 151);
  font-size: 45px;
`;
const Header = styled.h2`
  text-align: center;
  font-size: 30px;
  color: rgb(10, 101, 255);
  margin-top: 0;
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  color: white;

  border-radius: 4px;
  cursor: pointer;
`;
const Start = styled(Button)`
  position: absolute;
  right: 20px;
  top: 8px;
  @media only screen and (max-width: 300px) {
    right: 10px;
  }

  background: rgb(10, 101, 255);
`;
const Image = styled.img`
  height: 45px;
  margin-left: 30px;
  @media only screen and (max-width: 300px) {
    margin-left: 10px;
  } ;
`;
const Icon = styled.img`
  height: 23px;
  z-index: 20;
  margin-left: 5px;
  cursor: pointer;
`;
export default Team;
