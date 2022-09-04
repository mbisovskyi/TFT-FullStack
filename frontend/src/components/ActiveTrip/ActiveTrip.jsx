//Importing utils
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
//Importing styles
import "./ActiveTrip.css";
import { useState } from "react";

const ActiveTrip = (props) => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [user, token] = useAuth();
  const allTrips = props.allTrips;
  const activeTripTotalCosts = props.tripTotalCosts;

  //Active trips filter
  let activeTrips = allTrips.filter((trip) => {
    return trip.is_active === true;
  });

  //Getting an Id of active trip
  let activeTripId = activeTrips.map((trip) => trip.id);

  // Fetch current date
  function getCurrentDate() {
    let date = new Date();

    let year = date.getFullYear();
    year = year.toString();

    let month = date.getMonth();
    if (month < 10) {
      month = "0" + month;
    }

    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  async function handleEndTripClick() {
    debugger;
    let dateEnded = getCurrentDate();

    let updateTrip = activeTrips.map((trip) => {
      return {
        date_started: trip.date_started,
        date_ended: dateEnded,
        distance: trip.distance,
        place_from: trip.place_from,
        place_to: trip.place_to,
        income: trip.income - activeTripTotalCosts,
        is_active: false,
        user_id: user.id,
      };
    });

    let response = await axios.put(
      `http://127.0.0.1:8000/api/trips/${activeTripId}/`,
      ...updateTrip,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    console.log(response.data);
  }

  return activeTrips.length != 0 ? (
    <div className="activetrip-wrap">
      <div className="activetrip-upper-container">
        {activeTrips.map((trip, index) => {
          return (
            <div key={index}>
              <label className="activetrip-tag">Active trip</label>
              <p>
                {trip.place_from} - {trip.place_to}
              </p>
              <p>{trip.distance} miles</p>
              <label className="activetrip-total-tag">
                Income: ${trip.income - activeTripTotalCosts}
              </label>
            </div>
          );
        })}
      </div>
      <div className="activetrip-lower-container">
        <div>
          <button>Update</button>
        </div>
        <div>
          <button
            onClick={() => {
              handleEndTripClick();
              window.location.reload(false);
            }}
          >
            End trip
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              navigate("/costs", {
                state: { id: activeTripId },
              })
            }
          >
            Costs
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="no-active-trip-wrap">
      <div>
        <label>No active trip</label>
      </div>
      <button onClick={() => navigate("/newtrip")}>New trip</button>
    </div>
  );
};

export default ActiveTrip;
