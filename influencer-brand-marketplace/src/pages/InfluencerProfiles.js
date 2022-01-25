import React, { useEffect } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

function InfluencerProfiles() {
  useEffect(() => {
    loop();
  }, []);

  async function loop() {
    const querySnapshot = await getDocs(collection(db, "Influencer"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
  }

  return <div></div>;
}

export default InfluencerProfiles;
