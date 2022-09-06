// Importing styles
import "./YearIncome.css";

//Hooks
import { useNavigate } from "react-router-dom";

const YearIncome = (props) => {
  const navigate = useNavigate();

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
    <div onClick={() => navigate("/incomeDetails")} className="yearincome-wrap">
      <div className="yearincome-container">
        <label className="year-income-tag">Year income</label>
        <p>${totalYearIncome.toFixed(2)}</p>
        <label className="year-costs-tag">
          Year costs: ${props.totalCosts}
        </label>
      </div>
    </div>
  );
};

export default YearIncome;
