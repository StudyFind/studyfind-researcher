import React from "react";
import styled from "styled-components";
import Art from "./Art";
import Biography from "./Biography";
import Feature from "./Feature";
import logo from "images/logo.jpg";
import Yohan from "images/Founders/Yohan.jpg";
import Andrew from "images/Founders/Andrew.jpg";
import Vir from "images/Founders/Vir.jpg";
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
function Landing() {
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

      <Main>
        <First>
          <BigHeader1>Create a Research Account</BigHeader1>
          <BigHeader2>To Recruit and Manage Participants</BigHeader2>
          <a href="https://researcher.studyfind.org/auth">
            <Start2>Start Now</Start2>
          </a>
        </First>
        <Features>
          <Header2>Researcher Account Features:</Header2>
          <List>
            <Feature image={Clipboard} item="Pre-Screening Survey and Eligibility Score" />
            <Feature image={Calendar} item="Calendar View" />
          </List>
          <List>
            <Feature image={Bell} item="Participant Reminders" />
            <Feature image={Note} item="Quick Participant Notes" />
          </List>
          <List>
            <Feature image={Schedule} item="Scheduling Meetings" />
            <Feature image={Notification} item="Notification Updates" />
          </List>
          <List>
            <Feature image={Speech} item="HIPAA Compliant Instant Messaging" />
          </List>
        </Features>
        <Founders>
          <Header2>Founding Team</Header2>

          <About>
            <Biography
              name="Yohan Jhaveri"
              image={Yohan}
              major="Computer Science"
              alma="Emory University"
              link="https://www.linkedin.com/in/yohan-jhaveri-a142a2134/"
            />
            <Biography
              name="Andrew Garcia"
              image={Andrew}
              major="Health Policy and Management"
              alma="Emory University & Stonybrook University"
              link="https://www.linkedin.com/in/andrew-garcia-almeida/"
            />
            <Biography
              name="Vir Mittal"
              image={Vir}
              major="Computer Science"
              alma="Emory University"
              link="https://www.linkedin.com/in/vir-m-1b1981130/"
            />
          </About>
          <Header1>About Us</Header1>
          <Text>
            StudyFind was founded by three co-founders who wanted to participate in clinical
            research trials, but could not readily access and communicate with researchers!
          </Text>
          <Text>
            They set out to build a platform that caters to both Researchers and Study Volunteers.
          </Text>
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
            <a href="http://studyfind.org/">
              <Click>Click Here </Click>
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
    top: 260px;
  }
  @media only screen and (min-width: 1500px) {
    position: relative;
    top: 400px;
  }
`;
const First = styled.div`
  z-index: 1;
  background-size: 100% 100%;
  position: relative;
  padding-left: 20px;
  height: 200px;
  top: 250px;
  @media only screen and (min-width: 768px) {
    margin-left: 30px;
  } ;
`;

const Features = styled.div`
  position: relative;
  top: 330px;
  padding-left: 20px;
  height: 430px;
  padding-right: 10px;
  display: inline-block;
  @media only screen and (min-width: 768px) {
    height: 450px;
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
  height: 520px;
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
  top: 1400px;
  height: 200px;
  text-align: center;
  @media only screen and (min-width: 768px) {
    top: 500px;
  } ;
`;

const Clinical = styled.div`
  position: relative;
  top: 1300px;
  text-align: center;
  @media only screen and (min-width: 768px) {
    display: grid;
    top: 440px;
    height: 150px;
    grid-template-columns: 1.3fr 0.7fr;
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

  height: 25px;
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
  bottom: 28px;
  right: 20px;
  display: grid;
  grid-template-columns: 30px 30px 30px 30px;
`;
const BigHeader1 = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: rgb(32, 201, 151);
  @media only screen and (min-width: 1000px) {
    font-size: 40px;
  } ;
`;

const BigHeader2 = styled(BigHeader1)`
  color: rgb(10, 101, 255);
`;
const Header1 = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: rgb(32, 201, 151);
  @media only screen and (min-width: 768px) {
    font-size: 28px;
  }
  @media only screen and (min-width: 1000px) {
    font-size: 35px;
  } ;
`;

const Header2 = styled(Header1)`
  color: rgb(10, 101, 255);
`;

const Text = styled.p`
  font-family: "YAD7QhGT6o 0", _fb_, auto;
  font-size: 18px;
  margin: 10px;
  @media only screen and (min-width: 1000px) {
    font-size: 30px;
  } ;
`;
const Button = styled.button`
  padding: 8px;
  border: none;
  color: white;

  border-radius: 4px;
  cursor: pointer;
`;
const Start = styled(Button)`
  position: absolute;
  right: 20px;
  top: 5px;
  font-weight: 500;
  @media only screen and (max-width: 300px) {
    right: 10px;
  }

  background: rgb(10, 101, 255);
`;
const Click = styled(Button)`
  background: rgb(32, 201, 151);
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
`;
const Start2 = styled(Click)`
  background: rgb(10, 101, 255);
  position: relative;
`;
const TeamButton = styled(Start2)`
  position: relative;
  float: center;
  max-width: 250px;
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
