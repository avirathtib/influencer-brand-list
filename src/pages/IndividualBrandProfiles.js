import { React, useContext, useEffect } from "react";
import { ClickedProfileContext } from "../App";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function IndividualBrandProfiles(props) {
  const { clickedProfile, setClickedProfile } = useContext(
    ClickedProfileContext
  );
  const { email } = props.state;
  const { brandname } = useParams();

  useEffect(async () => {
    const docRef = doc(db, "Brand", brandname);
    const docSnap = await getDoc(docRef);

    console.log(email);
    if (docSnap.exists()) {
      setClickedProfile(docSnap.data());
    } else {
      console.log(brandname);
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, []);

  return (
    <div>
      <p>{clickedProfile.jobSummary}</p>
      <p>{clickedProfile.description}</p>
      <p>{clickedProfile.location}</p>
      <p>{clickedProfile.companySummary}</p>
      <p>{clickedProfile.tags}</p>
    </div>
  );
}
export default IndividualBrandProfiles;
