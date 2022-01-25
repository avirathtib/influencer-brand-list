import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import SignedInHomePage from "./pages/SignedInHomePage";
import SignedOutHomePage from "./pages/SignedOutHomePage";
import CreateInfluencerProfile from "./pages/CreateInfluencerProfile";

export const UserContext = createContext();
export const ProfileContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  const [profileType, setProfileType] = useState("");
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <ProfileContext.Provider value={{ profileType, setProfileType }}>
        <Router>
          <Routes>
            <Route path="" element={<SignedOutHomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="homepage" element={<SignedInHomePage />} />
            <Route
              path="createInfluencerPortfolio"
              element={<CreateInfluencerProfile />}
            />
          </Routes>
        </Router>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
