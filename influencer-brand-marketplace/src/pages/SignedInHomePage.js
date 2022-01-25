import { React, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfileContext } from "../App";

import InfluencerProfiles from "./InfluencerProfiles";

function SignedInHomePage() {
  const { profileType, setProfileType } = useContext(ProfileContext);
  return (
    <div>
      <p>Hello</p>
      {/* <div>
        {profileType === "Influencer" ? (
          <Link to={`/createInfluencerPortfolio`}>Create Profile</Link>
        ) : (
          <Link to={`/home`}>Home</Link>
        )}
      </div> */}
      <Link to={`/createInfluencerPortfolio`}>Create Profile</Link>
      <InfluencerProfiles />
    </div>
  );
}

export default SignedInHomePage;
