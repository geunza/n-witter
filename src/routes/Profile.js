import React, { useEffect } from "react";
import { auth } from "fBase";
import { useNavigate } from "react-router-dom";

const Profile = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
export default Profile;
