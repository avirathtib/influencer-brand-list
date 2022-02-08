import { React, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { db } from "../firebase-config";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { ProfileContext, SelectedTagsContext } from "../App";
import { useNavigate } from "react-router-dom";
import InfluencerProfiles from "./InfluencerProfiles";
import BrandProfiles from "./BrandProfiles";
//import CreateBrandsProfile from "./pages/CreateBrandsProfile";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function SignedInHomePage() {
  const { profileType, setProfileType } = useContext(ProfileContext);
  const { selectedTagList, setSelectedTagList } =
    useContext(SelectedTagsContext);
  const [tagList, setTagList] = useState([]);
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
    } catch (e) {
      console.error(e);
    }
  }, []);

  const navigate = useNavigate();

  const createinf = () => {
    navigate("/createInfluencerPortfolio");
  };
  const createbrand = () => {
    navigate("/createBrandsPortfolio");
  };
  const handleClick = (tagName) => {
    selectedTagList.push(tagName);
    setSelectedTagList(selectedTagList);
    console.log(selectedTagList);
  };

  const handleDelete = (tagName) => {
    const index = selectedTagList.indexOf(tagName);
    if (index > -1) {
      selectedTagList.splice(index, 1); // 2nd parameter means remove one item only
      setSelectedTagList(selectedTagList);
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
        {profileType == "Brand" ? (
          <button onClick={createinf}>Create Influencer Profile</button>
        ) : (
          <button onClick={createbrand}>Create Brand Profile</button>
        )}
      </div>

      <div>
        <p>tags display</p>
        <Stack direction="row" spacing={1}>
          {tagItems}
        </Stack>
      </div>

      {showAllProfiles ? (
        <div>
          {profileType == "Brand" ? <BrandProfiles /> : <InfluencerProfiles />}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SignedInHomePage;
