import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { auth } from 'database/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signout, fetchData } from 'database';

import Header from 'views/External/Header';
import Footer from 'views/External/Footer';

import Home from 'views/External/Home/Home';
import Auth from 'views/External/Auth/Auth';

function App() {
  const [cred, loading, error] = useAuthState(auth);
  const [data, setData] = useState(undefined);
  const history = useHistory();

  const handleInternal = async () => {
    if(cred.emailVerified && cred.displayName === 'researcher') {

      const { user, studies } = await fetchData(cred.uid);
      setData({ cred, user, studies });
      history.push("/account");

    } else {

      setData({});
      signout();

    }
  }

  const handleExternal = () => {
    setData({});
    history.push("/auth");
  }

  useEffect(() => {
    if(!loading) {
      cred
      ? handleInternal()
      : handleExternal()
    }
  }, [loading, cred])

  return !data ? <div> LOADING </div> : (
    <div>
      <Header />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/auth"><Auth /></Route>
        <Route path="*"><button onClick={signout} style={{ marginTop: 100 }}>signout</button></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
