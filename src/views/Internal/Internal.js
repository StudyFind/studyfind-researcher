import React from "react";
import styled from "styled-components";

import { Switch, Route } from "react-router-dom";

import Header from "views/External/Header";
import Footer from "views/External/Footer";

import Home from "views/External/Home/Home";
import Auth from "views/External/Auth/Auth";

function Internal() {
  return (
    <Screen>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
      </Switch>
      <Footer />
    </Screen>
  );
}

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default Internal;
