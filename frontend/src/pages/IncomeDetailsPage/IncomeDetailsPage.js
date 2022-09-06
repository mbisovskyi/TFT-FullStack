//styles
import "./IncomeDetailsPage.css";

//Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const IncomeDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, token] = useAuth();

  return (
    <div className="incomedetailspage-wrap">
      <button onClick={() => navigate("/")}>Back</button>
      <div className="income-costs-container">
        <div className="income-container">
          <label className="income-tag">Year income</label>
          <p>${state.yearIncome}</p>
        </div>
        <div className="costs-container">
          <label className="costs-tag">Year costs</label>
          <p>${state.yearCosts}</p>
        </div>
      </div>
      <div className="chart-container">Chart</div>
    </div>
  );
};

export default IncomeDetailsPage;
