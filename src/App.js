import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, useHistory } from "react-router-dom";

import { auth } from "database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signout, fetchData } from "database";

import Home from "views/External/Home/Home";
import Auth from "views/External/Auth/Auth";

function App() {
  const [cred, loading] = useAuthState(auth);
  const [data, setData] = useState();
  const history = useHistory();

  const handleInternal = async () => {
    if (cred.emailVerified && cred.displayName === "researcher") {
      const { user, studies } = await fetchData(cred.uid);
      setData({ cred, user, studies });
      history.push("/account");
    } else {
      setData({});
      signout();
    }
  };

  const handleExternal = () => {
    setData({});
    // history.push("/auth");
  };

  useEffect(() => {
    if (!loading) {
      cred ? handleInternal() : handleExternal();
    }
  }, [loading, cred]);

  return !data ? (
    <div> LOADING </div>
  ) : (
    <Screen>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route path="*">
          <button onClick={signout}>signout</button>
        </Route>
      </Switch>
    </Screen>
  );
}

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
