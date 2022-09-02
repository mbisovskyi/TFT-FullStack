// Importing styles
import "./YearIncome.css";

//Importing utils

const YearIncome = ({ yearIncome }) => {
  return (
    <div className="yearincome-wrap">
      <div className="yearincome-container">
        <label>Year income</label>
        <p>${yearIncome}</p>
      </div>
    </div>
  );
};

export default YearIncome;
