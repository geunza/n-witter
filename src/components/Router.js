import React from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Navigation />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              exact
              path="/profile"
              element={<Profile isLoggedIn={isLoggedIn} />}
            ></Route>
            {/* <Route path="*" element={<Navigate replace to="/" />}></Route> */}
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />}></Route>
            <Route path="*" element={<Navigate replace to="/" />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
