import React, { useState, useEffect } from 'react';
import { auth } from 'database/firebase';
import { signout, fetchData } from 'database';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import Header from 'views/External/Header';
import Footer from 'views/External/Footer';

import Home from 'views/External/Home/Home';
import Auth from 'views/External/Auth/Auth';

function App() {
  const [data, setData] = useState(undefined);
  const history = useHistory();
  const location = useLocation();

  const external = ['/', '/auth'];
  const internal = ['/account'];

  const handleInternal = async cred => {
    if(cred.emailVerified && cred.displayName === 'researcher') {

      const { user, studies } = await fetchData(cred.uid);
      setData({ cred, user, studies });
      if(external.includes(location.pathname)) history.push("/account");

    } else {

      setData({});
      signout();

    }
  }

  const handleExternal = () => {
    setData({});
    if(internal.includes(location.pathname)) history.push("/auth");
  }

  useEffect(() => {
    // signout();
    auth.onAuthStateChanged(cred => {
      if(cred) handleInternal(cred);
      else     handleExternal();
    });
  }, [])

  return !data ? <div> LOADING </div> : (
    <div>
      <Header />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/auth"><Auth /></Route>
        <Route path="*">{ location.pathname }</Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
