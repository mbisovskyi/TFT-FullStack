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

const FilterTripsPage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data);
    };
    allUserTrips();
  }, []);

  async function handleClick() {
    getTimeOfProvidedDates();
  }

  function getTimeOfProvidedDates() {
    let dateFrom = new Date(fromDate);
    let timeOfDateFrom = dateFrom.getTime();

    let dateTo = new Date(toDate);
    let timeOfDateTo = dateTo.getTime();

    let filteredTrips = filterTripByDates(timeOfDateFrom, timeOfDateTo);
    console.log(filteredTrips);
  }

  function filterTripByDates(timeFrom, timeTo) {
    let tripsArray = allTrips.filter((trip) => {
      let tripDateEndedTime = new Date(trip.date_ended);
      return tripDateEndedTime >= timeFrom && tripDateEndedTime <= timeTo;
    });
    return tripsArray;
  }

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>Back</button>
      <div className="filterdates-container">
        <label className="filter-dates-tag">Dates</label>
        <div className="date-fields">
          <span>
            From date:
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            ></input>
          </span>
          {"                          "}
          <span>
            To date:{" "}
            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            ></input>
          </span>
        </div>
      </div>
      <button onClick={handleClick}>Filter</button>
      <RecentTrips allTrips={allTrips} />
    </div>
  );
};

export default FilterTripsPage;
