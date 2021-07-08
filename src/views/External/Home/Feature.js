import styled from "styled-components";
function Feature(props) {
  return (
    <Place>
      <List>
        <Image src={props.image} alt={props.alt} />
        <Text>{props.item}</Text>
      </List>
    </Place>
  );
}
const Place = styled.div`
  margin-top: 50px;
  z-index: -1;
`;
const List = styled.div`
  display: flex;
`;
const Text = styled.p`
  font-weight: bold;
  font-size: 17px;
  margin-left: 15px;
  margin-right: 0.5%;
  padding-right: 10px;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
  @media only screen and (min-width: 1000px) {
    font-size: 30px;
  } ;
`;
const Image = styled.img`
  height: 25px;
  width: auto;
  position: relative;
  z-index: 99;
  @media only screen and (min-width: 768px) {
    height: 30px;
  }
  @media only screen and (min-width: 1000px) {
    height: 40px;
  } ;
`;

export default Feature;
