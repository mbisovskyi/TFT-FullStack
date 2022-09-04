//Styles
import "./AddTripCost.css";

//Hooks
import { useState } from "react";
import { useLocation } from "react-router-dom";

//Utils
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddTripCost = () => {
  const { state } = useLocation();
  const [user, token] = useAuth();
  const [costTitle, setCostTitle] = useState("");
  const [costAmount, setCostAmount] = useState();
  const [activeTrip, setActiveTrip] = useState([]);

  async function handleSubmit() {
    let newCost = {
      title: costTitle,
      amount: costAmount,
      trip_id: parseFloat(state.id),
      user_id: user.id,
    };
    await axios.post("http://127.0.0.1:8000/api/costs/", newCost, {
      headers: { Authorization: "Bearer " + token },
    });

    setActiveTrip(
      await axios.get(`http://127.0.0.1:8000/api/trips/${newCost.trip_id}/`, {
        headers: { Authorization: "Bearer " + token },
      })
    );
    console.log(activeTrip.data);
    window.location.reload(false);
  }

  return (
    <div className="addtripcost-wrap">
      <div className="addtripcost-container">
        <label className="add-costs-tag">Add costs</label>
        <p>Title</p>
        <input
          value={costTitle}
          onChange={(event) => setCostTitle(event.target.value)}
        ></input>
        <p>Amount</p>
        <input
          value={costAmount}
          onChange={(event) => setCostAmount(event.target.value)}
        ></input>
      </div>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddTripCost;
