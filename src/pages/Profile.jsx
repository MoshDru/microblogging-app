import "../App.css";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Context from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



function Profile() {
  const { username, setUsername } = useContext(Context);
  let [profileImage, setProfileImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(()=>{
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+localStorage.getItem('uid'));
  
    getDownloadURL(storageRef).then(function(url) {
      setProfileImage(url)
    });
  },[])
  return (
    <>
    <form className="userform" onSubmit={handleSubmit}>
      <div className="userprofile">
      <span className="profiletext">Profile</span>
      </div>
      <div className="upload-profile">
        <img 
        className="upload-profile-image"
        src={profileImage}/>
       
        <input 
          type="file"
          accept="image/*,.jpeg, png"
          onChange={(e)=>{
            const storage = getStorage();
            const storageRef = ref(storage, 'images/'+localStorage.getItem('uid'));
          
       
            uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
              getDownloadURL(storageRef).then(function(url) {
                setProfileImage(url)
              });

            });


            
  
          

           
          }}
        />
      </div>
      {/* <span className="usernametext">User Name</span> */}
      <div className="username-profile">
      <input className="userinput"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Your username"
        required
      />
       <button className="userbutton"
        type="submit"
        onClick={() =>
          localStorage.setItem("savedName", JSON.stringify(username))
        }
      >
        Save
      </button>
      </div>
     
    </form>
    </>
    
  );
}

export default Profile;
