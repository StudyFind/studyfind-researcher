import React, { useState } from "react";
import styled from "styled-components";

import { colors } from "./../../constants";

import { Button, Modal, Input } from "components";

function Footer() {
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleInputs = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const MODAL = (
    <Modal
      title="Feedback"
      button="Submit Feedback"
      onSubmit={() => {}}
      closeModal={() => setModal(false)}
    >
      <FeedbackMessage
        name="feedback"
        type="textarea"
        placeholder="Type your feedback here..."
        value={inputs.feedback}
        onChange={handleInputs}
      />
    </Modal>
  );

  return (
    <Box>
      {modal && MODAL}
      <Button color="primary" onClick={() => setModal(true)}>
        Feedback
        <FeedbackIcon className="fa fa-question-circle"></FeedbackIcon>
      </Button>
      <Icons>
        <SocialIcon icon="facebook-f" link="https://www.facebook.com/studyfindco" />
        <SocialIcon icon="instagram" link="https://www.instagram.com/studyfindco" />
        <SocialIcon icon="twitter" link="https://twitter.com/studyfindco" />
        <SocialIcon icon="linkedin" link="https://www.linkedin.com/company/studyfind" />
      </Icons>
    </Box>
  );
}

function SocialIcon({ icon, link }) {
  return (
    <Icon size="sm" target="_blank" href={link}>
      <i className={`fab fa-${icon}`}></i>
    </Icon>
  );
}

const Box = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #377dff;
  padding: 1rem 3rem;

  @media only screen and (max-width: 600px) {
    padding: 0.8rem 20px;
  }
`;

const FeedbackIcon = styled.i`
  margin-left: 5px;
`;

const Icons = styled.div`
  display: flex;
  grid-gap: 20px;

  @media only screen and (max-width: 600px) {
    grid-gap: 0px;
  }
`;

const Icon = styled.a`
  all: unset;
  cursor: pointer;

  font-size: 1.1rem;
  color: white;

  height: 2rem;
  width: 2rem;

  border-radius: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:active {
    background: ${colors.primary.dark};
  }

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const FeedbackMessage = styled(Input)`
  height: 250px;
`;

export default Footer;
