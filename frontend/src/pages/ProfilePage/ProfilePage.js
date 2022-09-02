import useAuth from "../../hooks/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  let navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default ProfilePage;
