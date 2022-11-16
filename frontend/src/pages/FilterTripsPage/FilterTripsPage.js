//Styles
import "./FilterTripsPage.css";

//Hooks
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

//Components
import DisplayFilteredTrips from "../../components/DisplayFilteredTrips/DisplayFilteredTrips";

//Utils
import axios from "axios";

const FilterTripsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);
  const [allUserCosts, setAllUserCosts] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filteredTripsTotalIncome, setFilteredTripsTotalIncome] = useState();
  const [filteredTripsAverageIncome, setFilteredTripsAverageIncome] =
    useState();
  const [tripsMessage, setTripsMessage] = useState("");

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
    if (state) {
      previouslyFilteredDates();
    }
  }, []);

  useEffect(() => {
    getTotalAndAverageIncomes();
  }, [filteredTrips]);

  useEffect(() => {
    getTotalAndAverageIncomes();
  }, [filteredTripsTotalIncome, filteredTripsAverageIncome]);

  function previouslyFilteredDates() {
    setFromDate(state.fromDate);
    setToDate(state.toDate);
  }

  function getTotalAndAverageIncomes() {
    getFilteredTripsTotalIncome();
    getFilteredTripsAverageIncome();
  }

  function getFilteredTripsAverageIncome() {
    let filteredTripsAverageIncome =
      filteredTripsTotalIncome / filteredTrips.length;
    setFilteredTripsAverageIncome(filteredTripsAverageIncome);
  }

  function getFilteredTripsTotalIncome() {
    let filteredTripsTotalIncome = 0;
    for (let i = 0; i < filteredTrips.length; i++) {
      filteredTripsTotalIncome += parseFloat(filteredTrips[i].income);
    }
    setFilteredTripsTotalIncome(filteredTripsTotalIncome);
  }

  function getTimeOfDates() {
    let dateOne = new Date(fromDate);
    let timeOfDateFrom = dateOne.getTime();

    let dateTwo = new Date(toDate);
    let timeOfDateTo = dateTwo.getTime();

    return { timeFrom: timeOfDateFrom, timeTo: timeOfDateTo };
  }

  function filterTripsBetweenTime(timeFrom, timeTo) {
    let tripsArray = allTrips.filter((trip) => {
      let tripDateEndedTime = new Date(trip.date_ended);
      return tripDateEndedTime >= timeFrom && tripDateEndedTime <= timeTo;
    });
    return tripsArray;
  }

  function handleClick() {
    let times = getTimeOfDates();
    let tripsArray = filterTripsBetweenTime(times.timeFrom, times.timeTo);
    setFilteredTrips(tripsArray);
    getTotalAndAverageIncomes();
    if (filteredTrips.length === 0) {
      setTripsMessage("No trips found");
    }
  }

  if (!state) {
    return (
      <div className="container">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <div className="filterdates-container">
          <label className="filter-dates-tag">Dates</label>
          <div className="date-fields">
            <div className="fromdate-container">
              <span>
                From:
                <input
                  type="date"
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                ></input>
              </span>
            </div>
            <div className="todate-container">
              <span>
                To:
                <input
                  type="date"
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                ></input>
              </span>
            </div>
          </div>
        </div>
        <button onClick={handleClick}>Filter</button>
        {filteredTrips.length !== 0 ? (
          <div className="filteredtrips-container">
            <label className="tripsfound-tag">Found trips</label>
            <DisplayFilteredTrips
              filteredTrips={filteredTrips}
              allUserCosts={allUserCosts}
              fromDate={fromDate}
              toDate={toDate}
            />
            <label className="average-tag">
              Average: {filteredTripsAverageIncome.toFixed(2)}
            </label>
            <label className="total-tag">
              Total: ${filteredTripsTotalIncome.toFixed(2)}
            </label>
            {filteredTrips.length > 3 ? (
              <a href="#app-logo" className="goup-button">
                Go up
              </a>
            ) : null}
          </div>
        ) : (
          <div>
            {!fromDate && !toDate ? (
              <p className="no-trips-found">
                Please, enter dates to filter through
              </p>
            ) : (
              <p className="no-trips-found">{tripsMessage}</p>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="container">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <div className="filterdates-container">
          <label className="filter-dates-tag">Dates</label>
          <div className="date-fields">
            <div className="fromdate-container">
              <span>
                From:
                <input
                  type="date"
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                ></input>
              </span>
            </div>
            <div className="todate-container">
              <span>
                To:
                <input
                  type="date"
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                ></input>
              </span>
            </div>
          </div>
        </div>
        <button onClick={handleClick}>Filter again</button>
        {filteredTrips.length !== 0 ? (
          <div>
            <div className="filteredtrips-container">
              <label className="tripsfound-tag">Trips found</label>
              <DisplayFilteredTrips
                filteredTrips={filteredTrips}
                allUserCosts={allUserCosts}
                fromDate={fromDate}
                toDate={toDate}
              />
              <label className="average-tag">
                Average: {filteredTripsAverageIncome.toFixed(2)}
              </label>
              <label className="total-tag">
                Total: ${filteredTripsTotalIncome.toFixed(2)}
              </label>
              {filteredTrips.length > 3 ? (
                <a href="#app-logo" className="goup-button">
                  Go up
                </a>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="no-trips-found">{tripsMessage}</p>
        )}
      </div>
    );
  }
};

export default FilterTripsPage;
