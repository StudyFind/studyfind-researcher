import styled from "styled-components";
import Linkedin from "images/linkedin.png";
import Facebook from "images/facebook.png";
import Youtube from "images/youtube.png";
import Instagram from "images/instagram.png";
function Foot() {
  return (
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
  );
}
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
    top: 900px;
  }
  @media only screen and (min-width: 1500px) {
    position: relative;
    top: 1030px;
  }
`;
const Feed = styled.div`
  display: flex;
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
const Socials = styled.div`
  position: relative;
  float: right;
  bottom: 23px;
  right: 20px;
  display: grid;
  grid-template-columns: 30px 30px 30px 30px;
`;
const Icon = styled.img`
  height: 22px;
  z-index: 20;
  margin-left: 5px;
  cursor: pointer;
`;
export default Foot;
