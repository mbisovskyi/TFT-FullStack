//Styles
import "./FilterTripsPage.css";

//Hooks
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

//Components
import RecentTrips from "../../components/RecentTrips/RecentTrips";

//Utils
import axios from "axios";
import DisplayFilteredTrips from "../../components/DisplayFilteredTrips/DisplayFilteredTrips";

const FilterTripsPage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);
  const [allUserCosts, setAllUserCosts] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filteredTripsTotalIncome, setFilteredTripsTotalIncome] = useState();
  const [filteredTripsAverageIncome, setFilteredTripsAverageIncome] =
    useState();

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
  }, []);

  useEffect(() => {
    let filteredTripsTotalIncome = 0;
    for (let i = 0; i < filteredTrips.length; i++) {
      filteredTripsTotalIncome += parseFloat(filteredTrips[i].income);
    }
    setFilteredTripsTotalIncome(filteredTripsTotalIncome);
    let filteredTripsAverageIncome =
      filteredTripsTotalIncome / filteredTrips.length;
    setFilteredTripsAverageIncome(filteredTripsAverageIncome);
  }, [filteredTrips]);

  function filterTripByDates(timeFrom, timeTo) {
    let tripsArray = allTrips.filter((trip) => {
      let tripDateEndedTime = new Date(trip.date_ended);
      return tripDateEndedTime >= timeFrom && tripDateEndedTime <= timeTo;
    });
    return tripsArray;
  }

  function getTimeOfProvidedDates() {
    let dateFrom = new Date(fromDate);
    let timeOfDateFrom = dateFrom.getTime();

    let dateTo = new Date(toDate);
    let timeOfDateTo = dateTo.getTime();

    let filteredTripsArray = filterTripByDates(timeOfDateFrom, timeOfDateTo);
    setFilteredTrips(filteredTripsArray);
  }

  function handleClick() {
    getTimeOfProvidedDates();
  }

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
          <label className="tripsfound-tag">Trips found</label>
          <DisplayFilteredTrips
            filteredTrips={filteredTrips}
            allUserCosts={allUserCosts}
          />
          <label className="average-tag">
            Average: {filteredTripsAverageIncome.toFixed(2)}
          </label>
          <label className="total-tag">
            Total: ${filteredTripsTotalIncome.toFixed(2)}
          </label>
        </div>
      ) : (
        <p className="no-trips-found">No trips found!</p>
      )}
    </div>
  );
};

export default FilterTripsPage;
