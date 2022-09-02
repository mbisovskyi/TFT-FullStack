import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./HomePage.css";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const navigate = useNavigate();
  const [user, token] = useAuth();
  // const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  // let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);
  return (
    <div className="container">
      <h3>
        <span
          className="profile-page-link"
          onClick={() => navigate("/profile")}
        >
          {user.first_name.toUpperCase()}
        </span>
        {`thank you for your service for whole country!`.toUpperCase()}
      </h3>
      {/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */}
    </div>
  );
};

export default HomePage;
