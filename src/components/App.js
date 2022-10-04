import React, { useState } from "react";
import AppRouter from "components/Router";
import fbase, { auth } from "fBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer> {new Date().getFullYear()} &copy; N-WITTER</footer>
    </>
  );
}

export default App;
