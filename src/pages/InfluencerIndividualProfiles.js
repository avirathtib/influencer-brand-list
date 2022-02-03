import { React, useContext } from "react";
import { ClickedProfileContext } from "../App";

function InfluencerIndividualProfiles() {
    const { clickedProfile, setClickedProfile } = useContext(ClickedProfileContext);

    return (
        <div>
            <p>{clickedProfile.name}</p>
            <p>{clickedProfile.description}</p>
            <p>{clickedProfile.location}</p>
            <p>{clickedProfile.instagram}</p>
            <p>{clickedProfile.twitter}</p>
            <p>{clickedProfile.facebook}</p>
            <p>{clickedProfile.portfolio}</p>
            <p>{clickedProfile.salary}</p>
            <p>{clickedProfile.tags}</p>
            <img src={clickedProfile.avatar}></img>
           
        </div>
    )
}

export default InfluencerIndividualProfiles
