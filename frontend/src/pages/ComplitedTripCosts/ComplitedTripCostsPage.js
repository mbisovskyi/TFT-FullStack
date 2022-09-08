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

  console.log(tripCosts);

  return (
    <div className="complitedtripcosts-wrap">
      <button onClick={(event) => navigate("/filterTrips")}>Back</button>
      {tripCosts.length >= 2 ? (
        <div>
          <a href="#app-logo">
            <svg
              className="goup-btn"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="37.088"
              viewBox="0 0 14 37.088"
            >
              <g
                id="Group_58"
                data-name="Group 58"
                transform="translate(-1474 -654)"
              >
                <g id="Group_59" data-name="Group 59">
                  <g id="Group_60" data-name="Group 60">
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M0,0V26.088"
                      transform="translate(1481 665)"
                      fill="none"
                      stroke="#35a376"
                      stroke-width="4"
                    />
                    <path
                      id="Polygon_1"
                      data-name="Polygon 1"
                      d="M7,0l7,12H0Z"
                      transform="translate(1474 654)"
                      fill="#35a376"
                    />
                  </g>
                </g>
              </g>
            </svg>
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
