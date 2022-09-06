// Importing styles
import "./NewTripPage.css";

// Importing utils
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const NewTripPage = () => {
  let navigate = useNavigate();
  const [user, token] = useAuth();
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
    getProfile();
    allUserTrips();
  }, []);

  async function handleSubmitPerMile() {
    let newTrip = {
      place_from: fromCity,
      place_to: toCity,
      distance: distance,
      income: (payRate * distance).toFixed(2),
    };
    await axios.post("http://127.0.0.1:8000/api/trips/", newTrip, {
      headers: { Authorization: "Bearer " + token },
    });
    navigate("/");
  }

  async function handleSubmitPerTrip() {
    let newTrip = {
      place_from: fromCity,
      place_to: toCity,
      distance: distance,
      income: perTripValue,
    };
    await axios.post("http://127.0.0.1:8000/api/trips/", newTrip, {
      headers: { Authorization: "Bearer " + token },
    });
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
      <button onClick={handleSubmitPerTrip}>Start</button>
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
      <button onClick={handleSubmitPerMile}>Start</button>
    </div>
  );
};

export default NewTripPage;
