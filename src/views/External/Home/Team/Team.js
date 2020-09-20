import React from 'react'
import styled from 'styled-components'

import Member from './Member'

import { Box, Pill, Heading, Subheading } from 'views/External/Home/styles';


function Team() {
  return (
    <Box id="team">
      <Pill> Founders </Pill>
      <Heading> Trust the professionals </Heading>
      <Subheading> Our co-founders are ready to help you find research studies </Subheading>

      <Members>
        <Member
          name="Yohan Jhaveri"
          img={require('images/yohan.png')}
          major="Computer Science"
          college="Emory University"
          collegeURL="https://www.emory.edu/"
          linkedinURL="https://www.linkedin.com/in/yohan-jhaveri-a142a2134"
        />

        <Member
          name="Andrew Garcia"
          img={require('images/andrew.png')}
          major="Health Policy and Management"
          college="Rollins School of Public Health"
          collegeURL="https://www.sph.emory.edu/"
          linkedinURL="https://www.linkedin.com/in/andrew-garcia-almeida"
        />

        <Member
          name="Vir Mittal"
          img={require('images/vir.png')}
          major="Computer Science"
          college="Emory University"
          collegeURL="https://www.emory.edu/"
          linkedinURL="https://www.linkedin.com/in/vir-m-1b1981130/"
        />
      </Members>
    </Box>
  )
}

const Members = styled.div`
  grid-gap: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

export default Team
