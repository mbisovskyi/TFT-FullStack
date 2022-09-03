import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YearIncome from "../../components/YearIncome/YearIncome";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import "./HomePage.css";
import ActiveTrip from "../../components/ActiveTrip/ActiveTrip";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data);
    };
    allUserTrips();
  }, [token]);

  return (
    <div className="container">
      <h3>
        <span
          className="profile-page-link"
          onClick={() => navigate("/profile")}
        >
          {user.first_name.toUpperCase()}
        </span>
        {`thank you for your service for whole country!`.toUpperCase()}
      </h3>
      <YearIncome allTrips={allTrips} />
      <ActiveTrip allTrips={allTrips} />
      {/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */}
    </div>
  );
};

export default HomePage;
