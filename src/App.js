import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import SignedInHomePage from "./pages/SignedInHomePage";
import SignedOutHomePage from "./pages/SignedOutHomePage";
import CreateInfluencerProfile from "./pages/CreateInfluencerProfile";
import InfluencerProfiles from "./pages/InfluencerProfiles";
import CreateBrandsProfile from "./pages/CreateBrandsProfile";
import InfluencerIndividualProfiles from "./pages/InfluencerIndividualProfiles";

export const UserContext = createContext();
export const ProfileContext = createContext();
export const ClickedProfileContext = createContext();
export const SelectedTagsContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  const [profileType, setProfileType] = useState("");
  const [clickedProfile, setClickedProfile] = useState("");
  const [selectedTagList, setSelectedTagList] = useState([]);
  return (
    <ClickedProfileContext.Provider
      value={{ clickedProfile, setClickedProfile }}
    >
      <SelectedTagsContext.Provider
        value={{ selectedTagList, setSelectedTagList }}
      >
        <UserContext.Provider value={{ email, setEmail }}>
          <ProfileContext.Provider value={{ profileType, setProfileType }}>
            <Router>
              <Routes>
                <Route path="" element={<SignedOutHomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="homepage" element={<SignedInHomePage />} />
                <Route
                  path="influencerProfiles"
                  element={<InfluencerProfiles />}
                />
                <Route
                  path="createInfluencerPortfolio"
                  element={<CreateInfluencerProfile />}
                />
                <Route
                  path="profiles/:id"
                  element={<InfluencerIndividualProfiles />}
                />
                <Route
                  path="createBrandsPortfolio"
                  element={<CreateBrandsProfile />}
                />
              </Routes>
            </Router>
          </ProfileContext.Provider>
        </UserContext.Provider>
      </SelectedTagsContext.Provider>
    </ClickedProfileContext.Provider>
  );
}

export default App;
