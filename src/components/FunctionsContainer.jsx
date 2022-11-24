import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Context from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { getDocs, collection, doc, getDoc, addDoc } from "firebase/firestore";
import AuthContext from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute";


function FunctionsContainer() {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState("");
  const [activeUser, setActiveUser] = useState('Test');

  return (
    <Context.Provider value={{ tweets, setTweets, username, setUsername }}>
      <div className="App">
        <BrowserRouter>
         <AuthContext>
         <Navbar fixed="top">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link" : "unselected-link"
              }
              to=""
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link" : "unselected-link"
              }
              to="/Profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link" : "unselected-link"
              }
              to="/Login"
            >
              Login
            </NavLink>
          </Navbar>
          <Routes>
            <Route index path="/" element={<PrivateRoute><Home activeUser={activeUser} /></PrivateRoute>} />
            <Route path="/Profile" element={
             <PrivateRoute>
              <Profile activeUser={activeUser} setActiveUser={setActiveUser} />
             </PrivateRoute>} />
            <Route path="/Login" element={<Login />} />
          </Routes>
         </AuthContext>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default FunctionsContainer;
