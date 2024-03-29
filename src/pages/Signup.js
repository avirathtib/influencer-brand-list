import React from "react";
import { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { ProfileContext } from "../App";

function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const { profileType, setProfileType } = useContext(ProfileContext);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      await setDoc(doc(db, profileType, registerEmail), {
        email: registerEmail,
        name: registerFullName,
        profileType: profileType,
        extendedProfileCreated: false,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Full Name"
          onChange={(event) => {
            setRegisterFullName(event.target.value);
          }}
        ></input>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <div>
          <div className="radio-btn-container">
            <div
              className="radio-btn"
              onClick={() => {
                setProfileType("Influencer");
              }}
            >
              <input
                type="radio"
                value={profileType}
                name="profileType"
                checked={profileType == "Influencer"}
              />
              Influencer
            </div>
            <div
              className="radio-btn"
              onClick={() => {
                setProfileType("Brand");
              }}
            >
              <input
                type="radio"
                value={profileType}
                name="profileType"
                checked={profileType == "Brand"}
              />
              Brand
            </div>
          </div>
        </div>

        <button onClick={register}> Create User</button>
      </div>
    </div>
  );
}

export default Signup;
