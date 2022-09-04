//Styles
import "./CostsPage.css";

//Hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

//utils
import axios from "axios";
import AddTripCost from "../../components/AddTripCost/AddTripCost";

const CostsPage = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [user, token] = useAuth();
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    const allTripCosts = async () => {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/costs/trip/${state.id}/`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setCosts(response.data);
    };
    allTripCosts();
  }, []);

  let allCostsAmounts = costs.map((cost) => {
    return parseFloat(cost.amount);
  });
  let costsTotal = 0;
  for (let i = 0; i < allCostsAmounts.length; i++) {
    costsTotal += allCostsAmounts[i];
  }

  return costs.length != 0 ? (
    <div className="costspage-wrap">
      <button onClick={() => navigate("/")}>Home</button>
      <div className="costspage-container">
        <label className="trip-costs-tag">Trip costs</label>
        {costs.map((cost, index) => {
          return (
            <div className="content-container" key={index}>
              <p className="cost-title">
                <span>{cost.title}: </span>${cost.amount}
              </p>
              <p className="cost-date">{cost.date_added}</p>
            </div>
          );
        })}
        <label className="costs-total-tag">
          Total: {costsTotal.toFixed(2)}
        </label>
      </div>
      <AddTripCost />
    </div>
  ) : (
    <div className="costspage-wrap">
      <button onClick={() => navigate("/")}>Home</button>
      <AddTripCost />
    </div>
  );
};

export default CostsPage;
