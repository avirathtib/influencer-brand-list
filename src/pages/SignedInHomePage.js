import { React, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfileContext } from "../App";
import { useNavigate } from "react-router-dom";
import InfluencerProfiles from "./InfluencerProfiles";
import BrandProfiles from "./BrandProfiles";
//import CreateBrandsProfile from "./pages/CreateBrandsProfile";

function SignedInHomePage() {
  const navigate = useNavigate();
  const { profileType, setProfileType } = useContext(ProfileContext);
  const createinf = () => {
    navigate("/createInfluencerPortfolio");
  };
  const createbrand = () => {
    navigate("/createBrandsPortfolio");
  };
  return (
    <div>
      <p>Hello</p>
      <p>{profileType}</p>
      {console.log(profileType)}
  
       <div>
          <button onClick={createinf}>Create Influencer Profile</button>
          </div>

          <div>
            <button onClick={createbrand}>Create Brand Profile</button>
            </div>

            

      <div>
        {profileType == "Brand" ? (
          <BrandProfiles/>
        ) : 
        <InfluencerProfiles/>}
      </div>
    </div>
  );
}

export default SignedInHomePage;