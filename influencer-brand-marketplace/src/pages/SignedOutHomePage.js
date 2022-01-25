import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

function SignedOutHomePage() {
  const navigate = useNavigate();
  //#endregion
  const tologin = () => {
    navigate("/login");
  };
  const tosignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <button onClick={tologin}>Login</button>
      <button onClick={tosignup}>Sign up</button>
    </div>
  );
}

export default SignedOutHomePage;
