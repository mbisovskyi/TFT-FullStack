// Styles
import "./UpdateTripPage.css";

//Hooks
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//utils
import axios from "axios";

const UpdateTripPAge = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, token] = useAuth();
  const [activeTrip, setActiveTrip] = useState([]);
  const [profile, setProfile] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [distance, setDistance] = useState();
  const [incomeType, setIncomeType] = useState("");
  const [perTripValue, setPerTripValue] = useState();

  useEffect(() => {
    const getProfile = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: "Bearer " + token },
      });
      setProfile(response.data);
    };
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data);
    };
    const getActiveTrip = async () => {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/trips/${state.tripId}/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setActiveTrip(response.data);
    };
    getProfile();
    allUserTrips();
    getActiveTrip();
  }, []);

  async function handleSubmitPerMile() {
    debugger;
    let newTrip = {
      place_from: fromCity,
      place_to: toCity,
      distance: distance,
      income: (payRate * distance).toFixed(2),
      date_started: activeTrip.date_started,
      date_ended: null,
      is_active: true,
      user_id: user.id,
    };
    await axios.put(
      `http://127.0.0.1:8000/api/trips/${state.tripId}/`,
      newTrip,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    navigate("/");
  }

  async function handleSubmitPerTrip() {
    let newTrip = {
      place_from: fromCity,
      place_to: toCity,
      distance: distance,
      income: perTripValue,
      date_started: activeTrip.date_started,
      date_ended: null,
      is_active: true,
      user_id: user.id,
    };
    await axios.put(
      `http://127.0.0.1:8000/api/trips/${state.tripId}/`,
      newTrip,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    navigate("/");
  }

  let payRate = profile.pay_rate;
  let complitedTrips = allTrips.filter((trip) => trip.is_active === false);
  let tripsIncomes = complitedTrips.map((trip) => {
    return parseFloat(trip.income);
  });

  let tripAverageIncome = 0;
  for (let i = 0; i < tripsIncomes.length; i++) {
    tripAverageIncome += tripsIncomes[i];
  }
  tripAverageIncome /= tripsIncomes.length;

  return incomeType === "perTrip" ? (
    <div className="new-trip-page-wrap">
      <button onClick={() => navigate("/")}>Back</button>
      <div className="create-trip-container">
        <label className="new-trip-tag">New trip</label>
        <form>
          <div className="input-fields-container">
            <p>From city</p>
            <input
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            ></input>
            <p>To city</p>
            <input
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            ></input>
            <p>Distance (miles)</p>
            <input
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            ></input>
            <p>Expected trip income</p>
            <select
              onChange={(event) => setIncomeType(event.target.value)}
              className="income-type-selector"
              name="options"
            >
              <option value="perMile">Per mile</option>
              <option value="perTrip">Per trip</option>
            </select>
            <input
              value={perTripValue}
              onChange={(event) => setPerTripValue(event.target.value)}
            ></input>
          </div>
        </form>
        <label className="total-trip-tag">
          Average: $
          {!tripAverageIncome
            ? (tripAverageIncome = 0)
            : tripAverageIncome.toFixed(2)}
        </label>
      </div>
      <button onClick={handleSubmitPerTrip}>Confirm</button>
    </div>
  ) : (
    //// Turnery
    <div className="new-trip-page-wrap">
      <button onClick={() => navigate("/")}>Back</button>
      <div className="create-trip-container">
        <label className="new-trip-tag">New trip</label>
        <form onSubmit={handleSubmitPerMile}>
          <div className="input-fields-container">
            <p>From city</p>
            <input
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            ></input>
            <p>To city</p>
            <input
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            ></input>
            <p>Distance (miles)</p>
            <input
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            ></input>
            <p>Expected trip income</p>
            <select
              onChange={(event) => setIncomeType(event.target.value)}
              className="income-type-selector"
              name="options"
            >
              <option value="perMile">Per mile</option>
              <option value="perTrip">Per trip</option>
            </select>
          </div>
        </form>
        <label className="per-mile-total-tag">
          Total: ${!distance ? payRate * 0 : (payRate * distance).toFixed(2)}
        </label>
        <label className="per-mile-average-tag">
          Average: $
          {!tripAverageIncome
            ? (tripAverageIncome = 0)
            : tripAverageIncome.toFixed(2)}
        </label>
      </div>
      <button onClick={handleSubmitPerMile}>Confirm</button>
    </div>
  );
};

export default UpdateTripPAge;
