import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

import "./RegisterPage.css";
import truckLogo from "./assets/truck-logo.png";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    ownerOperator: false,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container">
      <img src={truckLogo} alt="truck-logo" />
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        Owner operator?{" "}
        <input
          className="checkbox"
          type="checkbox"
          name="ownerOperator"
          checked={formData.ownerOperator}
          onChange={handleInputChange}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
