//Styles
import "./RecentTrips.css";

const RecentTrips = (props) => {
  //Complited trips filter
  let complitedTrips = props.allTrips.filter(
    (trip) => trip.is_active === false
  );

  //Filter of last four complited trips
  let recentFourTrips = complitedTrips.filter(
    (trip, index) => index >= complitedTrips.length - 4
  );

  //Calculates total income of recent trips
  let recentTripsTotalIncome = 0;
  for (let i = 0; i < recentFourTrips.length; i++) {
    recentTripsTotalIncome += parseFloat(recentFourTrips[i].income);
  }

  return (
    <div className="recenttrips-wrap">
      <div className="recenttrips-container">
        <label className="recent-trips-tag">Recent trips</label>
        {recentFourTrips.map((trip, index) => {
          return (
            <div className="recenttrips-item" key={index}>
              <div className="trip-dates-container">
                <p>{trip.date_started}</p>
                <p>{trip.date_ended}</p>
              </div>
              <p>
                <span>Route: </span>
                {"   "}
                {trip.place_from} - {trip.place_to}
              </p>
              <p>
                <span>Distance: </span>
                {"   "}
                {trip.distance} miles
              </p>
              <p>
                <span>Trip income: </span>
                {"   "}${trip.income}
              </p>
            </div>
          );
        })}
        <label className="recenttrips-average-tag">
          Average: ${recentTripsTotalIncome.toFixed(2) / recentFourTrips.length}
        </label>
        <label className="recenttrips-total-tag">
          Total: ${recentTripsTotalIncome.toFixed(2)}
        </label>
      </div>
    </div>
  );
};

export default RecentTrips;
