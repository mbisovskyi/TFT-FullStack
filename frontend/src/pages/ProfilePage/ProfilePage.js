import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

//Importing Components
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";

//Importing Syles
import "./ProfilePage.css";

const ProfilePage = () => {
  let navigate = useNavigate();
  const [user, token] = useAuth();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setProfile(response.data);
      } catch (error) {
        let addNew = {
          pay_rate: 0.0,
          address: " ",
          user_id: user.id,
        };
        let response = await axios.post(
          "http://127.0.0.1:8000/api/profile/",
          addNew,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>Home</button>
      <div className="profile-content">
        <h3>
          <span className="first-name">{user.first_name.toUpperCase()}</span>
          <p>Profile</p>
        </h3>
        <p className="profile-info color-white">
          <span className="green-title">Pay rate/mile: </span>
          {profile.pay_rate}
        </p>
        <p className="color-white">
          <span className="green-title">Address: </span>
          {profile.address}
        </p>
        <div className="update-component"></div>
        <UpdateProfile profile={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;
