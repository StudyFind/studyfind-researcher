import styled from "styled-components";
import Table from "images/table.png";
function Art() {
  return (
    <Place>
      <Crop>
        <Image src={Table} alt="Table" />
      </Crop>
    </Place>
  );
}
const Place = styled.div`
  position: relative;
  @media only screen and (min-width: 320px) and (max-width: 750px) {
    left: 6%;
  }
  @media only screen and (min-width: 350px) and (max-width: 750px) {
    left: 12%;
  }
  @media only screen and (min-width: 375px) and (max-width: 750px) {
    left: 13%;
  }
  @media only screen and (min-width: 400px) and (max-width: 750px) {
    left: 15%;
    margin-top: 70px;
  }
  @media only screen and (min-width: 500px) and (max-width: 750px) {
    left: 23%;
  }
  @media only screen and (max-width: 750px) {
    top: 15px;
  }

  @media only screen and (min-width: 1000px) {
    margin-right: 20px;
  }
`;
const Crop = styled.div`
  margin-top: 10px;

  overflow: hidden;
`;
const Image = styled.img`
  height: 300px;

  margin-bottom: -15px;

  @media only screen and (max-width: 768px) {
    height: 200px;
    margin-bottom: 10px;
  }
  @media only screen and (min-width: 1000px) {
    margin-top: 10px;
    margin-bottom: 15px;

    height: 280px;
  }
  @media only screen and (min-width: 1200px) {
    height: 300px;
  }
  @media only screen and (min-width: 1500px) {
    margin-top: 10px;
    margin-left: 100px;
    margin-bottom: 15px;
    height: 300px;
  } ;
`;
export default Art;
