import "../App.css";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../config/firebase";

function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, SetUser] = useState({});

  // useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
      SetUser(currentUser);
    });
  // })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    localStorage.clear()
    await signOut(auth);
  };
  console.log(localStorage.getItem("email"))
  return (
    <div className="loginform">
      <div>
        <h3 className="loginpageheaders"> Register User </h3>
        <input className="loginpageinputs"
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input className="loginpageinputs"
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button className="loginpagebutton" onClick={register}> Create User</button>
      </div>

      <div>
        <h3 className="loginpageheaders"> Login </h3>
        <input className="loginpageinputs"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input className="loginpageinputs"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button className="loginpagebutton" onClick={login}> Login</button>
      </div>

     {user?.email&& <h4 className="loginpageheaders"> User Logged In: </h4>}
      {user?.email}
      {user?.email&&<button className="loginpagebutton" onClick={logout}> Sign Out </button>}

      {!user?.email&&<button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>}
      {/* <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} /> */}
    </div>
  );
}

export default Login;
