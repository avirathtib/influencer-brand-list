import React, { useState, useContext, useEffect, useCallback } from "react";
import { db } from "../firebase-config";
import app from "../firebase-config";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { FieldValue } from "@firebase/firestore";
import { UserContext, ProfileContext } from "../App";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    // const storageRef = app.storage().ref();
    // const fileRef = storageRef.child(file.name);
    // await fileRef.put(file);
    // setFileUrl(await fileRef.getDownloadURL());
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
        });
      }
    );
  };

  const submitHandler = async (e) => {
    console.log("hi");
    e.preventDefault();

    console.log(profileType);
    console.log(email);
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
        avatar: fileUrl,
      },
      { merge: true }
    );

    tags.map((tag) => addToTags(tag));
  };

  const addToTags = async (tag) => {
    // const addTags = doc(db, tags, tag);

    const docRef = doc(db, "influencerTags", tag);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let oldinfluencers = docSnap.data().influencers;
      oldinfluencers.push(email);
      let oldsize = docSnap.data().size;

      await setDoc(doc(db, "influencerTags", tag), {
        name: tag,
        size: oldsize + 1,
        influencers: oldinfluencers,
      });
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(db, "influencerTags", tag), {
        name: tag,
        size: 1,
        influencers: [email],
      });
    }
  };

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

  // const submitHandler = (e) => {
  //   console.log(profileType)
  //   e.preventDefault();
  //   try {
  //     console.log(profileType)
  //     console.log(email)
  //     const addDetails = doc(db, profileType, email);
  //     console.log(addDetails);
  //     setDoc(
  //       addDetails,
  //       {
  //         description: description,
  //         location: location,
  //         instagram: instagram,
  //         facebook: facebook,
  //         portfolio: portfolio,
  //         salary: salary,
  //         extendedProfileCreated: true,
  //         tags: tags,
  //       },
  //       { merge: true }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        <input type="file" onChange={onFileChange} />
        <button onSubmit={submitHandler}>Submit</button>
      </form>
    </div>
  );
}

export default CreateInfluencerProfile;
