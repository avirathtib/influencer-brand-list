import { React, useContext, useEffect } from "react";
import { ClickedProfileContext } from "../App";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function InfluencerIndividualProfiles() {
  const { clickedProfile, setClickedProfile } = useContext(
    ClickedProfileContext
  );

  const { id } = useParams();

  useEffect(async () => {
    const docRef = doc(db, "Influencer", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setClickedProfile(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, []);

  //#endregion

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
      <p>hi</p>
    </div>
  );
}

export default InfluencerIndividualProfiles;
