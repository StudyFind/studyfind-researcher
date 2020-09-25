import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { NavHashLink as HashLink } from 'react-router-hash-link';
import $ from 'jquery';

import { Button } from 'components';

import SFLogo from 'images/logo.png';


function Header() {
  const [active, setActive] = useState(false);
  const [activeHash, setActiveHash] = useState();
  const [activePath, setActivePath] = useState();
  const location = useLocation();

  const LIMIT = 50

  $(document).scroll(() => {
    const scroll = $(document).scrollTop()
    setActive(scroll >= LIMIT)
  })

  useEffect(() => {
    // $(document).bind('scroll',function(e) {
    //   $('section').each(function() {
    //     const offsetTop = $(this).offset().top;
    //     const offsetY = window.pageYOffset;
    //     const height = $(this).height();
    //
    //     if (
    //        offsetTop < offsetY + 200
    //     && offsetTop > offsetY + 200 - height
    //     ) {
    //       window.history.replaceState(null, null, document.location.pathname + '#' + $(this).attr('id'));
    //     }
    //   });
    // });
  });

  useEffect(() => {
    setActiveHash(location.hash);
    setActivePath(location.pathname);
  }, [location]);

  const checkActive = link => {
    const [path, hash] = link.split('#');
    return (activePath === path) && (hash ? activeHash === ('#' + hash) : true)
  }

  const hashes = ['home', 'features', 'team', 'pricing', 'contact']

  return (
    <Box active={active}>
      <Logo to="/#home">
        <Icon src={SFLogo} />
        <Name>StudyFind</Name>
      </Logo>
      <Hashes>
        { hashes.map(hash => <Hash to={`/#${hash}`} active={checkActive(`/#${hash}`)}>{ hash }</Hash>) }
        <Link to="/auth"><StartButton>Start Now</StartButton></Link>
      </Hashes>
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  background: transparent;
  padding: 30px 50px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 600px) {
    padding: 30px;
  }

  ${props => props.active && `
    padding: 24px 50px;
    background: white;
    box-shadow: 0 0 10px 0 rgb(240,240,240) !important;

    @media only screen and (max-width: 600px) {
      padding: 24px 30px;
    }
  `}
`

const Logo = styled(HashLink)`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`

const Icon = styled.img`
  height: 2.2rem;
`

const Name = styled.h4`
  font-family: 'Avenir', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  margin-left: 10px;
  color: #323232;
`

const Hashes = styled.div`
  display: flex;
  grid-gap: 50px;
  align-items: center;

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const Hash = styled(HashLink)`
  all: unset;
  font-weight: 500;
  color: #888;
  text-transform: capitalize;
  cursor: pointer;

  color: ${props => props.active && '#377dff'};
`;

const StartButton = styled(Button)`
  font-size: 0.9rem;
  height: 48px;
`;

export default Header;
