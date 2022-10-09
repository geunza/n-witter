import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import fbase, { auth } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(auth.currentUser);
        console.log(auth.currentUser);
        console.log(userObj);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  //console.log(auth.currentUser);
  setInterval(() => {
    //console.log(auth.currentUser);
  }, 2000);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer> {new Date().getFullYear()} &copy; N-WITTER</footer>
    </>
  );
}

export default App;
