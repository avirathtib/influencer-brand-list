import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UserContext, ProfileContext } from "../App";
import { getStorage, ref } from "firebase/storage";
import ReactTagInput from "@pathofdev/react-tag-input";

function CreateInfluencerProfile() {
  const { email, setEmail } = useContext(UserContext);
  const { profileType, setProfileType } = useContext(ProfileContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("defaultdesc");
  const [location, setLocation] = useState("defaultloc");
  const [instagram, setInstagram] = useState("defaultinsta");
  const [twitter, setTwitter] = useState("defaultTwitter");
  const [facebook, setFacebook] = useState("defaultFacebook");
  const [portfolio, setPortfolio] = useState("defaultportfolio");
  const [salary, setSalary] = useState("defaultsalary");
  const [tags, setTags] = useState([]);
  const storage = getStorage();

  //need to do tags, image
  const [image , setImage] = useState('');
const upload = ()=>{
  
}

  const nameHandler = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    console.log(name);
  };

  const emailHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    console.log(email);
  };

  const descriptionHandler = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
    console.log(description);
  };

  const locationHandler = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
    console.log(location);
  };

  const instagramHandler = (e) => {
    console.log(e.target.value);
    setInstagram(e.target.value);
    console.log(instagram);
  };

  const twitterHandler = (e) => {
    console.log(e.target.value);
    setTwitter(e.target.value);
    console.log(twitter);
  };

  const facebookHandler = (e) => {
    console.log(e.target.value);
    setFacebook(e.target.value);
    console.log(facebook);
  };

  const portfolioHandler = (e) => {
    console.log(e.target.value);
    setPortfolio(e.target.value);
    console.log(portfolio);
  };

  const salaryHandler = (e) => {
    console.log(e.target.value);
    setSalary(e.target.value);
    console.log(salary);
  };

  const submitHandler = (e) => {
    console.log(profileType)
    e.preventDefault();
    try {
      console.log(profileType)
      console.log(email)
      const addDetails = doc(db, profileType, email);
      console.log(addDetails);
      setDoc(
        addDetails,
        {
          description: description,
          location: location,
          instagram: instagram,
          facebook: facebook,
          portfolio: portfolio,
          salary: salary,
          extendedProfileCreated: true,
          tags: tags,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          required="required"
          name="full_name"
          onChange={nameHandler}
          placeholder="Full Name"
          value={name}
        />
        <br />
        <input
          type="text"
          name="email"
          required="required"
          onChange={emailHandler}
          placeholder="Email"
          value={email}
        />
        <br />
        <input
          type="text"
          name="description"
          required="required"
          onChange={descriptionHandler}
          placeholder="Description"
        />
        <br />
        <input
          type="text"
          name="location"
          required="required"
          onChange={locationHandler}
          placeholder="Location"
        />
        <br />
        <input
          type="text"
          name="instagram"
          required="required"
          onChange={instagramHandler}
          placeholder="Instagram"
        />
        <br />
        <input
          type="text"
          name="twitter"
          required="required"
          onChange={twitterHandler}
          placeholder="Twitter"
        />
        <br />{" "}
        <input
          type="text"
          name="Facebook"
          required="required"
          onChange={facebookHandler}
          placeholder="Facebook"
        />
        <br />{" "}
        <input
          type="text"
          name="portfolio"
          required="required"
          onChange={portfolioHandler}
          placeholder="Portfolio"
        />
        <br />
        <input
          type="text"
          name="salary"
          required="required"
          onChange={salaryHandler}
          placeholder="Salary"
        />
        <br />
        <p>Tags</p>
        <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
        <center>
      <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
      <button onClick={upload}>Upload</button>
      </center>
        <input type="submit" name="Submit" />
      </form>
    </div>
  );
}

export default CreateInfluencerProfile;
