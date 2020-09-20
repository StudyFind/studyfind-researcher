import React, { useState } from 'react'
import styled from 'styled-components'

import { colors } from './../../constants'

import { Button, Card } from 'components'

function Tabs({ tabs, width, ...rest }) {
  const [current, setCurrent] = useState(0)

  const handleBack = () => setCurrent(current - 1)
  const handleNext = () => setCurrent(current + 1)

  return (
    <Box width={width} {...rest}>
      <TabList>
        {
          tabs.map((tab, index) => (
            <Tab key={index} selected={index === current} onClick={() => setCurrent(index)}>
              <Name>{ tab.name }</Name>
            </Tab>
          ))
        }
      </TabList>
      <Content>
        <Flex>
          <h2>{ tabs[current].name[0].toUpperCase() + tabs[current].name.slice(1) }</h2>
          <Buttons>
            { current !== 0 && <Button color="secondary" onClick={handleBack}>Back</Button> }
            { current !== (tabs.length - 1) && <Button onClick={handleNext}>Next</Button> }
          </Buttons>
        </Flex>
        { tabs[current].content }
      </Content>
    </Box>
  )
}

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: ${props => props.width};
`

const TabList = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-bottom: 10px;
`

const Tab = styled.button`
  all: unset;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  background: transparent;

  display: flex;
  align-items: center;

  color: #666;
  // background: ${colors.secondary.soft};

  ${props => props.selected && `
    // color: white;
    // background: #377dff;
    color: ${colors.primary.hard};
    background: ${colors.primary.soft};
    // border: 1px solid #377dff;

    & > div {
      color: white;
    }
  `}
`

const Content = styled(Card)`
  width: 100%;
  padding: 1.5rem;
`

const Name = styled.span`
  text-transform: capitalize;
`

export default Tabs
