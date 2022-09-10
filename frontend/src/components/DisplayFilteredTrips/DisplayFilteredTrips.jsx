// Styles
import "./DisplayFilteredTrips.css";

//Hooks
import { useNavigate } from "react-router-dom";

const DisplayFilteredTrips = (props) => {
  const navigate = useNavigate();

  // This needed to be able to run a tarnery statement to display total costs for trip, if trip has expenses
  let allTripsIdsOfAllCosts = props.allUserCosts.map((cost) => cost.trip.id);

  // All code bellow is for to get an Array with total costs for each filtered trip -----------------------------------------------------------------------
  let idsOfFilteredTrips = props.filteredTrips.map((trip) => trip.id);
  let allCostsOfFilteredTrips = props.filteredTrips.map((trip) => {
    let tripTotalCosts = 0;
    let tripCostsArray = props.allUserCosts.filter(
      (cost) => cost.trip.id === trip.id
    );
    for (let i = 0; i < tripCostsArray.length; i++) {
      tripTotalCosts += parseFloat(tripCostsArray[i].amount);
    }
    return tripTotalCosts;
  });
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  return (
    <div className="displayfilteredtrips-wrap">
      {props.filteredTrips.map((trip, index) => {
        return (
          <div key={index} className="content-container">
            <p>
              <span className="text-green">Route: </span>
              {trip.place_from} - {trip.place_to}
            </p>
            <p>
              <span className="text-green">Distance: </span>
              {trip.distance} miles
            </p>
            <div className="tripincomecosts-container">
              <p>
                <span className="text-green">Income: </span>${trip.income}
              </p>
              {allTripsIdsOfAllCosts.includes(
                trip.id
              ) /* If trip Id is in Array of allUserCosts.filter((cost) => cost.trip.id) */ ? (
                <div
                  className="costs-link"
                  onClick={() =>
                    navigate("/tripCosts", { state: { tripId: trip.id } })
                  }
                >
                  <p>
                    <span className="text-red">Costs: </span>$
                    {allCostsOfFilteredTrips[index]}
                  </p>
                </div>
              ) : /* Getting total trip costs from an Array of total costs for filtered trips */
              null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayFilteredTrips;
