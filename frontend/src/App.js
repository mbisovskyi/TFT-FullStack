// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NewTripPage from "./pages/NewTripPage/NewTripPage";
import UpdateTripPAge from "./pages/UpdateTripPage/UpdateTripPage";
import CostsPage from "./pages/CostsPage/CostsPage";
import FilterTripsPage from "./pages/FilterTripsPage/FilterTripsPage";
import IncomeDetailsPage from "./pages/IncomeDetailsPage/IncomeDetailsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import ComplitedTripCostsPage from "./pages/ComplitedTripCosts/ComplitedTripCostsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/newtrip"
          element={
            <PrivateRoute>
              <NewTripPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/costs"
          element={
            <PrivateRoute>
              <CostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateTrip"
          element={
            <PrivateRoute>
              <UpdateTripPAge />
            </PrivateRoute>
          }
        />
        <Route
          path="/filterTrips"
          element={
            <PrivateRoute>
              <FilterTripsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/incomeDetails"
          element={
            <PrivateRoute>
              <IncomeDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tripCosts"
          element={
            <PrivateRoute>
              <ComplitedTripCostsPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
