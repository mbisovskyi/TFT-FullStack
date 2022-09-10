//Styles
import "./ComplitedTripCostsPage.css";

//Utils
import axios from "axios";

//Hooks
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const ComplitedTripCostsPage = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [tripCosts, setTripCosts] = useState([]);

  useEffect(() => {
    const getTripCosts = async () => {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/costs/trip/${state.tripId}/`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setTripCosts(response.data);
    };
    getTripCosts();
  }, []);

  return (
    <div className="complitedtripcosts-wrap">
      <button onClick={(event) => navigate("/filterTrips")}>Back</button>
      {tripCosts.length >= 1 ? (
        <div>
          <a className="goup-btn" href="#app-logo">
            Go up
          </a>
        </div>
      ) : null}
      <div className="complitedtripcosts-container">
        <label className="trip-costs-tag">Trip costs</label>
        {tripCosts.map((cost, index) => {
          return (
            <div className="costs-content" key={index}>
              <p>
                <span>{cost.title}</span>
              </p>
              <p>${cost.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplitedTripCostsPage;
