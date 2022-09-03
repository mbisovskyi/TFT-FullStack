//Styles
import "./CostsPage.css";

//Hooks
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

//utils
import axios from "axios";

const CostsPage = () => {
  let navigate = useNavigate();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data);
    };
    allUserTrips();
  }, [token]);

  return (
    <div className="costspage-wrap">
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default CostsPage;
