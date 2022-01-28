import { React, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfileContext } from "../App";

import InfluencerProfiles from "./InfluencerProfiles";
import CreateBrandsProfile from "./pages/CreateBrandsProfile";

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
      {(() => {
        if (profileType === "Influencer") {
          return (
            <Link to={`/createInfluencerPortfolio`}>
              Create Influencer Profile
            </Link>
          );
        } else {
          return (
            // <Link to={`/createBrandsPortfolio`}>Create Brand Profile</Link>
            <p>jj</p>
          );
        }
      })()}

      <div>
        {(() => {
          if (profileType === "Influencer") {
            return <InfluencerProfiles />;
          } else {
            return;
          }
        })()}
        {/* <InfluencerProfiles /> */}
      </div>
    </div>
  );
}

export default SignedInHomePage;
