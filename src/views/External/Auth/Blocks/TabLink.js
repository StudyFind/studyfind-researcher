import styled from "styled-components";

export default styled.a`
  all: unset;
  cursor: pointer;
  margin: auto;
  color: #718096;
  font-size: 0.9rem;
  border-bottom: 1px dashed grey;

  &:hover {
    color: rgb(49, 130, 207);
    border-color: rgb(49, 130, 207);
    text-decoration: none;
  }
`;
