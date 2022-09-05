//utils
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

// Styles
import "./HomePage.css";

//Components
import ActiveTrip from "../../components/ActiveTrip/ActiveTrip";
import YearIncome from "../../components/YearIncome/YearIncome";
import RecentTrips from "../../components/RecentTrips/RecentTrips";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);
  const [allUserCosts, setAllUserCosts] = useState([]);

  useEffect(() => {
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data);
    };
    const allUserCosts = async () => {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/costs/user/${user.id}/`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setAllUserCosts(response.data);
    };
    allUserTrips();
    allUserCosts();
  }, [token]);

  // Complited trips filter
  let costsOfComplitedTrips = allUserCosts.filter(
    (cost) => cost.trip.is_active === false
  );
  let allCostsAmounts = costsOfComplitedTrips.map((cost) => {
    return parseFloat(cost.amount);
  });
  let totalCosts = 0;
  allCostsAmounts.forEach((element) => {
    totalCosts += element;
  });

  //Active trip costs filter
  let allCostsOfActiveTrip = allUserCosts.filter(
    (cost) => cost.trip.is_active === true
  );
  let activeTripCostsAmounts = allCostsOfActiveTrip.map((cost) =>
    parseFloat(cost.amount)
  );
  let activeTripTotalCosts = 0;
  for (let i = 0; i < activeTripCostsAmounts.length; i++) {
    activeTripTotalCosts += activeTripCostsAmounts[i];
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
      <YearIncome allTrips={allTrips} totalCosts={totalCosts} />
      <ActiveTrip allTrips={allTrips} tripTotalCosts={activeTripTotalCosts} />
      <RecentTrips allTrips={allTrips} />
      <button>Filter trips</button>
    </div>
  );
};

export default HomePage;
