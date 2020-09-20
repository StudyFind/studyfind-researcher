import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from './../../constants';

import { Button } from 'components';

function Footer(){
  const [feedbackModal, setFeedbackModal] = useState(false)

  return (
    <Box>
      <Button color="primary" onClick={() => setFeedbackModal(true)}>
        Feedback
        <FeedbackIcon className="fa fa-question-circle"></FeedbackIcon>
      </Button>
      <Icons>
        <Icon size="sm" target="_blank" href="https://www.facebook.com/studyfindco"><i className="fab fa-facebook-f"></i></Icon>
        <Icon size="sm" target="_blank" href="https://www.instagram.com/studyfindco"><i className="fab fa-instagram"></i></Icon>
        <Icon size="sm" target="_blank" href="https://twitter.com/studyfindco"><i className="fab fa-twitter"></i></Icon>
        <Icon size="sm" target="_blank" href="https://www.linkedin.com/company/studyfind"><i className="fab fa-linkedin"></i></Icon>
      </Icons>
    </Box>
  )
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
`

const FeedbackIcon = styled.i`
  margin-left: 5px;
`

const Icons = styled.div`
  display: flex;
  grid-gap: 20px;

  @media only screen and (max-width: 600px) {
    grid-gap: 0px;
  }
`

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

  &:hover, &:active {
    background: ${colors.primary.dark};
  }

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`

export default Footer
