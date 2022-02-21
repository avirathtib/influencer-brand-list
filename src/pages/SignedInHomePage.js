import { React, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { db } from "../firebase-config";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { ProfileContext, SelectedTagsContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import BrandProfiles from "./BrandProfiles";
//import CreateBrandsProfile from "./pages/CreateBrandsProfile";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InfluencerProfiles2 from "./InfluencerProfiles2";
import "../styles/mui.css";
import ProfileCard2 from "../components/ProfileCard2";

function SignedInHomePage() {
  const { profileType, setProfileType } = useContext(ProfileContext);
  const { email, setEmail } = useContext(UserContext);
  const { selectedTagList, setSelectedTagList } =
    useContext(SelectedTagsContext);
  const [tagList, setTagList] = useState([]);
  const [extendedProfileCreated, setExtendedProfileCreated] = useState(false);
  const [showAllProfiles, setShowAllProfiles] = useState(true);

  useEffect(async () => {
    try {
      let temp = [];
      const querySnapshot = await getDocs(collection(db, "influencerTags"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        temp.push(doc.data().name);
      });
      setTagList(temp);
      //#endregion
      const docRef = doc(db, profileType, email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setExtendedProfileCreated(docSnap.data().extendedProfileCreated);
        console.log(docSnap.data().extendedProfileCreated);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.error(e);
    }
  }, [extendedProfileCreated]);

  const navigate = useNavigate();

  const createinf = () => {
    navigate("/createInfluencerPortfolio");
  };
  const createbrand = () => {
    navigate("/createBrandsPortfolio");
  };
  const handleClick = (tagName) => {
    const newArr = [...selectedTagList];
    newArr.push(tagName);
    setSelectedTagList(newArr);
    console.log(selectedTagList);
  };

  const handleDelete = (tagName) => {
    const newArr = [...selectedTagList];

    const index = newArr.indexOf(tagName);
    if (index > -1) {
      newArr.splice(index, 1); // 2nd parameter means remove one item only
      setSelectedTagList(newArr);
    }
  };

  const tagItems = tagList.map((tagName) => (
    <Chip
      label={tagName}
      onClick={() => handleClick(tagName)}
      onDelete={() => handleDelete(tagName)}
    />
  ));

  return (
    <div>
      <div>
        {}
        {profileType == "Influencer" && !extendedProfileCreated ? (
          <button onClick={createinf}>Create Influencer Profile</button>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        {}
        {profileType == "Brand" && !extendedProfileCreated ? (
          <button onClick={createbrand}>Create Brand Profile</button>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        <p>{extendedProfileCreated}</p>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {tagItems}
        </Stack>
      </div>

      {showAllProfiles ? (
        <div>
          {profileType == "Brand" ? <ProfileCard2 /> : <BrandProfiles />}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SignedInHomePage;
