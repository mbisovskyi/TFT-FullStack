// Importing styles
import "./YearIncome.css";

//Importing utils

const YearIncome = (props) => {
  let complitedTripsArray = props.allTrips.filter(
    (trip) => trip.is_active === false
  );

  let tripsIncomes = complitedTripsArray.map((trip) => {
    return parseFloat(trip.income);
  });

  let totalYearIncome = 0;
  for (let i = 0; i < tripsIncomes.length; i++) {
    totalYearIncome += tripsIncomes[i];
  }

  return (
    <div className="yearincome-wrap">
      <div className="yearincome-container">
        <label>Year income</label>
        <p>${totalYearIncome.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default YearIncome;
