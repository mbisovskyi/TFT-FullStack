import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YearIncome from "../../components/YearIncome/YearIncome";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [trips, setTrips] = useState([]);
  const [yearIncomeValue, setYearIncomeValue] = useState();

  useEffect(() => {
    allUserTrips();
  }, [token]);

  useEffect(() => {
    getYearIncome();
  }, [trips]);

  async function allUserTrips() {
    let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
      headers: { Authorization: "Bearer " + token },
    });
    setTrips(response.data);
  }

  async function getYearIncome() {
    let allTripsIncomes = trips.map((trip) => {
      return parseFloat(trip.income);
    });
    let value = 0;
    for (let i = 0; i < allTripsIncomes.length; i++) {
      value += allTripsIncomes[i];
    }
    setYearIncomeValue(value);
  }

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
      <YearIncome yearIncome={yearIncomeValue} />
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
