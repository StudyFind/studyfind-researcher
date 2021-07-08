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
