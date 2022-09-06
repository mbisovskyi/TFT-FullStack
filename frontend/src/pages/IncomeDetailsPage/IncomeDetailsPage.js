//styles
import "./IncomeDetailsPage.css";

//Hooks
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const IncomeDetailsPage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();

  return (
    <div className="incomedetailspage-wrap">
      <button onClick={() => navigate("/")}>Back</button>
      <div className="income-costs-container">
        <div className="income-container">
          <label>Year income</label>
          <p>$1213</p>
        </div>
        <div className="costs-container">
          <label>Year costs</label>
          <p>$112</p>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetailsPage;
