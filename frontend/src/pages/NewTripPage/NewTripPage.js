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
    getProfile();
  }, []);

  let payRate = profile.pay_rate;
  console.log(payRate);

  return incomeType === "perTrip" ? (
    <div className="new-trip-page-wrap">
      <button onClick={() => navigate("/")}>Home</button>
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
        <label className="total-trip-tag">Average per trip: </label>
      </div>
      <button>Start</button>
    </div>
  ) : (
    <div className="new-trip-page-wrap">
      <button onClick={() => navigate("/")}>Home</button>
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
          </div>
        </form>
        <label className="per-mile-total-tag">
          Total: ${!distance ? payRate * 0 : payRate * distance}
        </label>
        <label className="per-mile-average-tag">Average per trip: </label>
      </div>
      <button>Start</button>
    </div>
  );
};

export default NewTripPage;
