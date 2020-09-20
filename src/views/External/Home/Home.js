import React from 'react';
import styled from 'styled-components';

import Hero from './Hero/Hero';
import Features from './Features/Features';
import Team from './Team/Team';
import Pricing from './Pricing/Pricing';
import Contact from './Contact/Contact';

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Team />
      <Pricing />
      <Contact />
    </div>
  )
}

export default Home
