//Importing utils
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
//Importing styles
import "./ActiveTrip.css";

const ActiveTrip = (props) => {
  const [user, token] = useAuth();
  const allTrips = props.allTrips;

  let activeTrips = allTrips.filter((trip) => {
    return trip.is_active === true;
  });

  let activeTripId = activeTrips.map((trip) => trip.id);

  function getCurrentDate() {
    let date = new Date();

    let year = date.getFullYear();
    year = year.toString();

    let month = date.getMonth();
    if (month < 10) {
      month = "0" + month;
    }

    let day = date.getDay();
    if (day < 10) {
      day = "0" + day;
    }

    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  async function handleEndTripClick() {
    let dateEnded = getCurrentDate();

    let updateTrip = activeTrips.map((trip) => {
      return {
        date_started: trip.date_started,
        date_ended: dateEnded,
        distance: trip.distance,
        place_from: trip.place_from,
        place_to: trip.place_to,
        income: trip.income,
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

  return (
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
                Total: {trip.income}
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
          <button>Costs</button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTrip;
