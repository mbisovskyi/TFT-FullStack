import "./UpdateProfile.css";

//Importing Hooks
import { useState } from "react";

//Importing utils
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const UpdateProfile = ({ profile }) => {
  const [user, token] = useAuth({});
  const [payRateInput, setPayRateInput] = useState("");
  const [addressInput, setAddress] = useState("");

  async function handleSubmit() {
    let newProfile = {
      pay_rate: payRateInput ? payRateInput : user.pay_rate,
      address: addressInput ? addressInput : user.address,
      user_id: user.id,
    };
    try {
      await axios.put("http://127.0.0.1:8000/api/profile/", newProfile, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="update-profile-wrap">
      <div className="update-profile-container">
        <form onSubmit={handleSubmit}>
          <div className="content">
            <label>Update profile</label>
            <p className="content-title">Pay rate /mile</p>
            <input
              placeholder={profile.pay_rate}
              value={payRateInput}
              onChange={(event) => setPayRateInput(event.target.value)}
            ></input>
            <p className="content-title">Address</p>
            <input
              placeholder={profile.address}
              type="text"
              value={addressInput}
              onChange={(event) => setAddress(event.target.value)}
            ></input>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
