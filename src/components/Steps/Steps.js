import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from './../../constants'

import { Card, Button } from 'components'

function Steps({ steps, width, ...rest }) {
  const [current, setCurrent] = useState(2);

  const handleBack = () => setCurrent(current - 1)
  const handleNext = () => setCurrent(current + 1)

  return (
    <Box {...rest}>
      <Timeline>
        {
          steps.map((step, index) => (
            <Step>
              {
                index < current
                ? <Success className="fas fa-check" />
                : <Index>{ index + 1 }</Index>
              }

              <Name complete={index < current}>{ step.name }</Name>
              { (steps.length - 1 !== index) && <Line complete={index < current} /> }
            </Step>
          ))
        }
      </Timeline>
      <Content style={{ width }}>
        <Head>
          <h2>{ steps[current].name }</h2>
          <Buttons>
            { current !== 0 && <Button color="secondary" onClick={handleBack}>Back</Button> }
            { current !== (steps.length - 1) && <Button onClick={handleNext}>Next</Button> }
          </Buttons>
        </Head>
        { steps[current].content }
      </Content>
    </Box>
  )
}

const Content = styled(Card)`
  width: 100%;
  padding: 1.5rem;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Timeline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 8px;
  text-align: center;
  margin-bottom: 50px;
`

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 8px;
`

const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  height: 25px;
  width: 25px;
  font-weight: 500;
  font-size: 0.8rem;
  padding-top: 1px;

  color: ${colors.secondary.hard};
  background: ${colors.secondary.soft};

  ${props => props.complete && `
    color: ${colors.primary.hard};
    background: ${colors.primary.soft};
  `}
`

const Success = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  height: 25px;
  width: 25px;
  font-size: 0.7rem;

  color: white;
  background: ${colors.success.hard};
`

const Name = styled.div`
  font-weight: 500;
  color: ${colors.secondary.hard};

  ${props => props.complete && `
    color: ${colors.success.hard}
  `}
`

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
`

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  height: 1px;
  width: 30px;
  margin: 0 5px;
  background: ${colors.secondary.soft};

  ${props => props.complete && `
    background: ${colors.success.hard}
  `}
`

export default Steps
