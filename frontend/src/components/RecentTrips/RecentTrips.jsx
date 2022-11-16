//Styles
import "./RecentTrips.css";

//Hooks
import { useNavigate } from "react-router-dom";

const RecentTrips = (props) => {
  const navigate = useNavigate();

  //Complited trips filter
  let complitedTrips = props.allTrips.filter(
    (trip) => trip.is_active === false
  );

  let allCostsTripsIds = props.allUserCosts.map((cost) => cost.trip.id);

  //Filter of last four complited trips
  let recentTrips = complitedTrips.filter(
    (trip, index) => index >= complitedTrips.length - 2
  );

  //Calculates total income of recent trips
  let recentTripsTotalIncome = 0;
  for (let i = 0; i < recentTrips.length; i++) {
    recentTripsTotalIncome += parseFloat(recentTrips[i].income);
  }

  return !props.filteredTrips ? (
    <div className="recenttrips-wrap">
      <div className="recenttrips-container">
        <label className="recent-trips-tag">Recent trips</label>
        {recentTrips.map((trip, index) => {
          return (
            <div className="recenttrips-item" key={index}>
              <div className="trip-dates-container">
                <p>
                  <span>Started: </span>
                  {"   "}
                  {trip.date_started}
                </p>
                <p>
                  <span>Ended: </span>
                  {"   "}
                  {trip.date_ended}
                </p>
              </div>
              <div className="recenttrips-content-container">
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
            </div>
          );
        })}
        <label className="recenttrips-average-tag">
          Average: $
          {recentTripsTotalIncome
            ? (recentTripsTotalIncome / recentTrips.length).toFixed(2)
            : (recentTripsTotalIncome = 0)}
        </label>
        <label className="recenttrips-total-tag">
          Total: $
          {recentTripsTotalIncome
            ? recentTripsTotalIncome.toFixed(2)
            : (recentTripsTotalIncome = 0)}
        </label>
      </div>
    </div>
  ) : (
    <div className="recenttrips-wrap">
      <div className="recenttrips-container">
        <label className="recent-trips-tag">Recent trips</label>
        {props.filteredTrips.map((trip, index) => {
          return (
            <div className="recenttrips-item" key={index}>
              <div className="trip-dates-container">
                <p>
                  <span>Started: </span>
                  {"   "}
                  {trip.date_started}
                </p>
                <p>
                  <span>Ended: </span>
                  {"   "}
                  {trip.date_ended}
                </p>
              </div>
              <p>
                <span>Route: </span>
                {"   "}
                {trip.place_from} - {trip.place_to}
              </p>
              <div className="distance-costs-btn-container">
                <p>
                  <span>Distance: </span>
                  {"   "}
                  {trip.distance} miles
                </p>
                {allCostsTripsIds.includes(trip.id) ? (
                  <div className="costs-button-container">
                    <svg
                      onClick={() =>
                        navigate("/tripCosts", { state: { tripId: trip.id } })
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      width="39"
                      height="44"
                      viewBox="0 0 39 44"
                    >
                      <g
                        id="Group_57"
                        data-name="Group 57"
                        transform="translate(-1215 -581)"
                      >
                        <g
                          id="Rectangle_14"
                          data-name="Rectangle 14"
                          transform="translate(1215 602)"
                          fill="none"
                          stroke="#35a376"
                          stroke-width="1"
                        >
                          <rect width="39" height="9" rx="4.5" stroke="none" />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="38"
                            height="8"
                            rx="4"
                            fill="none"
                          />
                        </g>
                        <text
                          id="_"
                          data-name="$"
                          transform="translate(1234 615)"
                          fill="#fff"
                          font-size="36"
                          font-family="Corbel-Bold, Corbel"
                          font-weight="700"
                        >
                          <tspan x="-9.492" y="0">
                            $
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </div>
                ) : (
                  // Tarnery -----------------------------------------------------------------------------------------------
                  <div className="empty-costs-container"></div>
                )}
              </div>

              <p>
                <span>Trip income: </span>
                {"   "}${trip.income}
              </p>
            </div>
          );
        })}
        <label className="recenttrips-average-tag">
          Average: $
          {recentTripsTotalIncome
            ? (recentTripsTotalIncome / recentTrips.length).toFixed(2)
            : (recentTripsTotalIncome = 0)}
        </label>
        <label className="recenttrips-total-tag">
          Total: $
          {recentTripsTotalIncome
            ? recentTripsTotalIncome.toFixed(2)
            : (recentTripsTotalIncome = 0)}
        </label>
      </div>
    </div>
  );
};

export default RecentTrips;
