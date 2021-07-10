import styled from "styled-components";
import Art from "./Art";
import Biography from "./Biography";
import Feature from "./Feature";
import logo from "images/logo.jpg";
import Yohan from "images/Founders/yohan.jpg";
import Andrew from "images/Founders/andrew.jpg";
import Vir from "images/Founders/vir.jpg";
import Bell from "images/Symbols/bell.jpg";
import Calendar from "images/Symbols/calendar.jpg";
import Clipboard from "images/Symbols/clipboard.jpg";
import Note from "images/Symbols/note.jpg";
import Notification from "images/Symbols/notification.jpg";
import Schedule from "images/Symbols/schedule.jpg";
import Speech from "images/Symbols/speech.jpg";
import Linkedin from "images/linkedin.png";
import Facebook from "images/facebook.png";
import Youtube from "images/youtube.png";
import Instagram from "images/instagram.png";
import { Link } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";

function Landing() {
  return (
    <Website>
      <Top>
        <Link to="/auth">
          <Start>Start Now</Start>
        </Link>
        <Link to="/">
          <Image src={logo} alt="StudyFind Logo" />
        </Link>
      </Top>

      <Main>
        <First>
          <BigHeader1>Create a Research Account</BigHeader1>
          <BigHeader2>To Recruit and Manage Participants</BigHeader2>
          <Link to="/auth">
            <Start2>Start Now</Start2>
          </Link>
        </First>
        <Features>
          <Header2>Researcher Account Features:</Header2>
          <List>
            <Feature
              image={Clipboard}
              alt="Clipboard"
              item="Pre-Screening Survey and Eligibility Score"
            />
            <Feature image={Calendar} alt="Calendar" item="Calendar View" />
          </List>
          <List>
            <Feature image={Bell} alt="Bell" item="Participant Reminders" />
            <Feature image={Note} alt="Note" item="Quick Participant Notes" />
          </List>
          <List>
            <Feature image={Schedule} alt="Schedule" item="Scheduling Meetings" />
            <Feature image={Notification} alt="Notification" item="Notification Updates" />
          </List>
          <List>
            <Feature image={Speech} alt="Speech" item="HIPAA Compliant Instant Messaging" />
          </List>
        </Features>
        <Founders>
          <Header2>Founding Team</Header2>

          <About>
            <Biography
              name="Yohan Jhaveri"
              image={Yohan}
              alt="Yohan"
              major="Computer Science"
              alma="Emory University"
              link="https://www.linkedin.com/in/yohan-jhaveri-a142a2134/"
            />
            <Biography
              name="Andrew Garcia"
              image={Andrew}
              alt="Andrew"
              major="Health Policy and Management"
              alma="Emory University & Stonybrook University"
              link="https://www.linkedin.com/in/andrew-garcia-almeida/"
            />
            <Biography
              name="Vir Mittal"
              image={Vir}
              alt="Vir"
              major="Computer Science"
              alma="Emory University"
              link="https://www.linkedin.com/in/vir-m-1b1981130/"
            />
          </About>
          <Header1>About Us</Header1>
          <Words>
            StudyFind was founded by three co-founders who wanted to participate in clinical
            research trials, but could not readily access or communicate with researchers!
          </Words>
          <Words>
            They set out to build a platform that caters to both researchers and study volunteers.
          </Words>
        </Founders>
        <Team>
          <Link to="/team">
            <TeamButton>Meet The Entire Team </TeamButton>
          </Link>
        </Team>
        <Clinical>
          <SignUp>
            <Header1>
              Sign Up For Clinical Trials <br />
            </Header1>
            <Header2>By Clicking Below</Header2>
            <a href="https://studyfind-participant.firebaseapp.com/">
              <ClickHere>Click Here </ClickHere>
            </a>
          </SignUp>
          <Art />
        </Clinical>
      </Main>
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

const Website = styled.div`
  width: 100%;
`;
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

const Main = styled.div`
  position: relative;
  top: 20px;
  width: 100%;
  @media only screen and (min-width: 500px) {
    position: relative;
    top: 100px;
  }
  @media only screen and (min-width: 1000px) {
    position: relative;
    top: 210px;
  }
  @media only screen and (min-width: 1500px) {
    position: relative;
    top: 350px;
  }
`;
const First = styled.div`
  z-index: 1;
  background-size: 100% 100%;
  position: relative;
  padding-left: 20px;
  height: 200px;
  top: 170px;
  @media only screen and (min-width: 350px) {
    top: 280px;
  }
  @media only screen and (min-width: 500px) and (max-width: 700px) {
    position: relative;
    top: 250px;
  }
  @media only screen and (min-width: 768px) and (max-width: 999px) {
    top: 250px;
    max-width: 500px;
  }
  @media only screen and (min-width: 1200px) {
    top: 250px;
  }
  @media only screen and (min-width: 1500px) {
    top: 220px;
  }
  @media only screen and (min-width: 768px) {
    margin-left: 30px;
  }
  @media only screen and (max-width: 330px) {
    top: 220px;
  } ;
`;

const Features = styled.div`
  position: relative;
  top: 330px;
  padding-left: 20px;
  height: 300px;
  padding-right: 10px;
  display: inline-block;
  @media only screen and (max-width: 768px) {
    top: 300px;
  }
  @media only screen and (min-width: 768px) {
    height: 250px;
    padding-left: 60px;
    position: relative;
  } ;
`;
const List = styled.div`
  margin-left: 5px;
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: 800px 900px;
  }
  @media only screen and (min-width: 1500px) {
    display: grid;
    grid-template-columns: 1000px 900px;
  } ;
`;
const Founders = styled.div`
  text-align: center;
  text-justify: inter-word;
  position: relative;
  top: 400px;
  height: 420px;
  margin: 0 10px;
  @media only screen and (max-width: 350px) {
    position: relative;
    height: 600px;
  }
  @media only screen and (min-width: 768px) {
    height: 600px;
  }
`;
const About = styled.div`
  justify-content: center;
  margin-bottom: 10px;

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const Team = styled.div`
  position: relative;
  top: 1350px;
  height: 200px;
  text-align: center;
  @media only screen and (max-width: 330px) {
    top: 1300px;
  }
  @media only screen and (min-width: 768px) {
    top: 520px;
  }
  @media only screen and (min-width: 1000px) {
    top: 560px;
  }
  @media only screen and (min-width: 1200px) {
    top: 500px;
  }
`;

const Clinical = styled.div`
  position: relative;
  top: 1250px;
  text-align: center;
  @media only screen and (min-width: 768px) {
    display: grid;
    top: 440px;
    height: 150px;
    grid-template-columns: 1.3fr 0.7fr;
  }
  @media only screen and (min-width: 1500px) {
    height: 180px;
  } ;
`;
const SignUp = styled.div`
  max-width: 1150px;
  @media only screen and (min-width: 768px) {
    text-align: left;
    margin-left: 10%;
  } ;
`;
const Bottom = styled.div`
  color: white;
  position: relative;
  top: 1300px;

  height: 30px;
  padding: 5px;
  background: rgb(55, 125, 255);
  @media only screen and (min-width: 400px) {
    position: relative;
    top: 1370px;
  }
  @media only screen and (min-width: 768px) {
    position: relative;
    top: 620px;
  }
  @media only screen and (min-width: 1000px) {
    position: relative;
    top: 860px;
  }
  @media only screen and (min-width: 1500px) {
    position: relative;
    top: 950px;
  }
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
  bottom: 23px;
  right: 20px;
  display: grid;
  grid-template-columns: 30px 30px 30px 30px;
`;
const BigHeader1 = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: rgb(32, 201, 151);
  @media only screen and (min-width: 768px) and (max-width: 999px) {
    font-size: 32px;
  }
  @media only screen and (min-width: 1000px) {
    font-size: 38px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 45px;
  }
  @media only screen and (min-width: 1500px) {
    font-size: 50px;
  }
`;

const BigHeader2 = styled(BigHeader1)`
  color: #3182ce;
`;
const Header1 = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: rgb(32, 201, 151);
  @media only screen and (min-width: 768px) {
    font-size: 28px;
  }
  @media only screen and (min-width: 1000px) {
    font-size: 40px;
  }
  @media only screen and (min-width: 1500px) {
    font-size: 45px;
  } ;
`;

const Header2 = styled(Header1)`
  color: #3182ce;
`;

const Words = styled(Text)`
  font-size: 18px;
  margin: 10px;
  @media only screen and (min-width: 500px) {
    font-size: 25px;
  } ;
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
    background: #3182ce;
    cursor: pointer;
  }
`;
const ClickHere = styled(Press)`
  background: rgb(32, 201, 151);
  padding: 15px;
  font-size: 20px;
  position: relative;
  top: 10px;
  font-weight: bold;
  &:hover {
    background: #38a169;
    cursor: pointer;
  }
`;
const Start2 = styled(ClickHere)`
  background: #377dff;
  position: relative;
  top: 20px;
  height: 40px;

  &:hover {
    background: #3182ce;
    cursor: pointer;
  }
`;
const TeamButton = styled(Start2)`
  position: relative;
  float: center;
  max-width: 250px;

  &:hover {
    background: #3182ce;
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
  height: 22px;
  z-index: 20;
  margin-left: 5px;
  cursor: pointer;
`;

export default Landing;
