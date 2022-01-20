import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import SignedInHomePage from "./pages/SignedInHomePage";
import SignedOutHomePage from "./pages/SignedOutHomePage";

export const UserContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <Router>
        <Routes>
          <Route path="" element={<SignedOutHomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="homepage" element={<SignedInHomePage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
