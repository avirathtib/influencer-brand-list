import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { FieldValue } from "@firebase/firestore";
import { UserContext, ProfileContext } from "../App";
import ReactTagInput from "@pathofdev/react-tag-input";

function CreateBrandsProfile() {
  const { email, setEmail } = useContext(UserContext);
  const { profileType, setProfileType } = useContext(ProfileContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("defaultdesc");
  const [location, setLocation] = useState("defaultloc");
  const [link, setLink] = useState("defaultlink");
  const [remote, setRemote] = useState("false");
  const [tags, setTags] = useState([]);

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
    setLocation(e.target.value);
  };

  const linkHandler = (e) => {
    setLink(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const addDetails = doc(db, profileType, email);
      console.log(addDetails);
      setDoc(
        addDetails,
        {
          description: description,
          location: location,
          socialmedialink: link,
          extendedProfileCreated: true,
          remote: remote,
          tags: tags,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }

     
  }
 

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
          name="Link to social media"
          required="required"
          onChange={linkHandler}
          placeholder="Instagram"
        />

        <br />

        <div>
          <div className="radio-btn-container">
            <div
              className="radio-btn"
              onClick={() => {
                setRemote("true");
              }}
            >
              <input
                type="radio"
                value={remote}
                name="remote"
                checked={remote == "true"}
              />
              Remote
            </div>
            <div
              className="radio-btn"
              onClick={() => {
                setRemote("false");
              }}
            >
              <input
                type="radio"
                value={remote}
                name="remote"
                checked={remote == "false"}
              />
              Not Remote
            </div>
          </div>
        </div>

        <p>Tags</p>
        <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
        <input type="submit" name="Submit" />
      </form>
    </div>
  );
}

export default CreateBrandsProfile;
