import styled from "styled-components";
import logo from "images/logo.jpg";
import { Link } from "react-router-dom";
import Info from "./Info";
import Yohan from "images/Founders/yohan.jpg";
import Andrew from "images/Founders/andrew.jpg";
import Vir from "images/Founders/vir.jpg";
import Romina from "images/Advisory/romina.png";
import Reina from "images/Advisory/reina.png";
import Suraj from "images/Advisory/suraj.png";
import Evans from "images/Advisory/evans.png";
import Aidan from "images/Advisory/aidan.jpeg";
import Ayesha from "images/Advisory/ayesha.png";
import Alexis from "images/Advisory/alexis.png";
import Hannah from "images/Advisory/hannah.png";
import Gabi from "images/Advisory/gabi.png";
import Steven from "images/Advisory/steven.png";
import Talia from "images/Advisory/talia.png";
import Jeremy from "images/Interns/jeremy.png";
import Wendy from "images/Interns/wendy.png";
import David from "images/Interns/david.png";
import Keely from "images/Interns/keely.png";
import Wenkai from "images/Interns/wenkai.png";
import Gustavo from "images/Interns/gustavo.png";
import Yuyao from "images/Interns/yuyao.png";
import Michael from "images/Interns/michael.png";
import Jonathon from "images/Interns/jonathon.png";
import Mikolaj from "images/Interns/mikolaj.png";
import Ziyao from "images/Interns/ziyao.png";
import Natalie from "images/Interns/natalie.png";
import Mileen from "images/Interns/mileen.png";
import Sundari from "images/Interns/sundari.png";
import Placeholder from "images/Interns/placeholder.png";
import Linkedin from "images/linkedin.png";
import Facebook from "images/facebook.png";
import Youtube from "images/youtube.png";
import Instagram from "images/instagram.png";
import { Text, Header, Button } from "@chakra-ui/react";

function Team() {
  return (
    <Website>
      <Top>
        <a href="https://researcher.studyfind.org/auth">
          <Start>Start Now</Start>
        </a>
        <Link to="/">
          <Image src={logo} alt="StudyFind logo" />
        </Link>
      </Top>
      <Section>
        <BG1>
          <BigHeader>Meet Our Team</BigHeader>
          <RegHeader>Founding Team</RegHeader>
          <Row>
            <Info name="Yohan Jhaveri" image={Yohan} height="150%" alt="Yohan Jhaveri" />
            <Info name="Andrew Garcia" image={Andrew} height="165%" alt="Andrew Garcia" />
            <Info name="Vir Mittal" image={Vir} height="150%" alt="Vir Mittal" />
          </Row>
        </BG1>
        <BG2>
          <RegHeader>National Advisory Board</RegHeader>
          <Row>
            <Info name="Romina" image={Romina} height="110%" alt="Romina" />
            <Info name="Suraj" image={Suraj} height="140%" bottom="10px" alt="Suraj" />
            <Info name="Reina" image={Reina} height="130%" bottom="10px" alt="Reina" />
          </Row>
          <Row>
            <Info name="Evans" image={Evans} height="110%" bottom="10px" alt="Evans" />
            <Info name="Aidan" image={Aidan} height="120%" alt="Aidan" />
            <Info name="Ayesha" image={Ayesha} height="116%" bottom="10px" alt="Ayesha" />
          </Row>
          <Row>
            <Info name="Alexis" image={Alexis} height="135%" alt="Alexis" />
            <Info name="Hannah" image={Hannah} height="135%" alt="Hannah" />
            <Info name="Gabi" image={Gabi} height="110%" bottom="10px" alt="Gabi" />
          </Row>
          <Row>
            <Info name="Steven" image={Steven} alt="Steven" />
            <Info name="Talia" image={Talia} alt="Talia" />
          </Row>
        </BG2>
        <BG3>
          <RegHeader>Interns</RegHeader>
          <Row>
            <Info name="Jeremy" image={Jeremy} height="135%" alt="Jeremy" />
            <Info name="Wendy" image={Wendy} alt="Wendy" />
            <Info name="David" image={David} height="150%" bottom="30px" alt="David" />
          </Row>
          <Row>
            <Info name="Keely" image={Keely} alt="Keely" />
            <Info name="Wenkai" image={Wenkai} height="135%" alt="Wenkai" />
            <Info name="Yuyao" image={Yuyao} height="135%" bottom="10px" alt="Yuyao" />
          </Row>
          <Row>
            <Info name="Jonathon" image={Jonathon} alt="Jonathon" />
            <Info name="Eric" image={Placeholder} alt="Eric" />
            <Info name="Liang" image={Placeholder} alt="Liang" />
          </Row>

          <Row>
            <Info name="Ivan" image={Placeholder} alt="Ivan" />
            <Info name="Jason" image={Placeholder} alt="Jason" />
          </Row>
        </BG3>
        <BG4>
          <RegHeader>Notable Alumni</RegHeader>
          <Row>
            <Info name="Michael" image={Michael} height="150%" bottom="20px" alt="Michael" />
            <Info name="Gustavo" image={Gustavo} alt="Gustavo" />
            <Info name="Mikolaj" image={Mikolaj} alt="Mikolaj" height="150%" />
          </Row>
          <Row>
            <Info name="Ziyao" image={Ziyao} alt="Ziyao" />
            <Info name="Natalie" image={Natalie} alt="Natalie" />
            <Info name="Mileen" image={Mileen} alt="Mileen" />
          </Row>
          <Row>
            <Info name="Sundari" image={Sundari} alt="Sundari" height="115%" />
          </Row>
        </BG4>
      </Section>
      <Bottom>
        <Feed>
          Feedback<Question>?</Question>
        </Feed>
        <Socials>
          <a href="https://www.linkedin.com/company/studyfind/">
            <Icon src={Linkedin} alt="Linkedin logo" />
          </a>
          <a href="https://www.facebook.com/studyfindco/">
            <Icon src={Facebook} alt="Facebook logo" />
          </a>
          <a href="https://www.youtube.com/channel/UCqOfwBbtyfMg-Hog0tj30qQ">
            <Icon src={Youtube} alt="Youtube logo" />
          </a>
          <a href="https://www.instagram.com/studyfindco/">
            <Icon src={Instagram} alt="Instagram logo" />
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
  padding: 20px 0;
  z-index: 0;
`;
const BG2 = styled.div`
  background: #c5ffeb;
  z-index: -1;
  padding: 20px 0;
`;
const BG3 = styled.div`
  z-index: 0;
  padding: 20px 0;
`;
const BG4 = styled.div`
  background: #c5ffeb;
  z-index: -1;
  padding: 20px 0;
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
  padding: 0px 10px;
  background: rgb(55, 125, 255);
`;
const Question = styled.div`
  color: rgb(55, 125, 255);
  height: 20px;
  width: 20px;
  margin-left: 5px;
  margin-top: 1px;
  text-align: center;
  border-radius: 50%;
  background: white;
  position: relative;
  top: 1px;
`;
const Feed = styled.div`
  display: flex;
`;
const Socials = styled.div`
  position: relative;
  float: right;
  bottom: 22px;
  right: 20px;
  display: grid;
  grid-template-columns: 30px 30px 30px 30px;
`;
const BigHeader = styled.h1`
  text-align: center;
  color: rgb(32, 201, 151);
  font-size: 45px;

  font-weight: 700;
  @media only screen and (min-width: 1000px) {
    margin-left: 5px;
  } ;
`;
const RegHeader = styled.h2`
  text-align: center;
  font-size: 30px;

  margin-top: 0;
  font-weight: 700;
  color: #3182ce;
`;
const Press = styled(Button)`
  padding: 8px;
  border: none;
  color: white;

  border-radius: 4px;
  cursor: pointer;
`;
const Start = styled(Press)`
  position: absolute;
  right: 20px;
  top: 5px;
  font-weight: 700;
  @media only screen and (max-width: 300px) {
    right: 5px;
    top: 7px;
    height: 35px;
    font-weight: 500;
  }
  @media only screen and (min-width: 1000px) {
    padding: 10px;
  }

  background: #377dff;

  &:hover {
    background: #377dff;
    cursor: pointer;
  }
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
