import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [profileType, setProfileType] = useState("oneWay");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      // const query = await db
      //   .collection("users")
      //   .collection(profileType)
      //   .doc(registerEmail)
      //   .set({
      //     email: registerEmail,
      //     name: registerFullName,
      //     profileType: profileType,
      //   });
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
                checked={profileType == "Influencers"}
              />
              Influencer
            </div>
            <div
              className="radio-btn"
              onClick={() => {
                setProfileType("Brands");
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
