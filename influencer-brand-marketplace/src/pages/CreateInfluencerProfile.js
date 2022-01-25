import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UserContext, ProfileContext } from "../App";

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
  //need to do tags, image

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
    console.log(email);
    console.log(description);
    console.log(location);
    console.log(instagram);
    console.log(facebook);
    console.log(portfolio);

    e.preventDefault();
    try {
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
        <input type="submit" name="Submit" />
      </form>
    </div>
  );
}

export default CreateInfluencerProfile;
