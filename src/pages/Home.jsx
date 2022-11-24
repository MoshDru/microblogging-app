import "../App.css";
import React, { useState, useContext, useEffect } from "react";
import { nanoid } from "nanoid";
import TweetsList from "../components/TweetsList";
import AddTweet from "../components/AddTweet";
import Context from "../context/ThemeContext";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

function Home() {
  const { tweets, setTweets } = useContext(Context);
  const colRef = collection(db, "tweets");

  const getTweets = async () => {
    const q = query(colRef, orderBy("date", "desc"));
    const data = await getDocs(q);
    const newTweets = data.docs?.map((doc) => doc.data());
    setTweets(newTweets);
  };

  useEffect(() => {
    getTweets();
  }, []);

  const addTweet = (text) => {
    const date = new Date();
    const newTweet = {
      id: nanoid(),
      content: text,
      date: date.toISOString(),
      userName: JSON.parse(localStorage.getItem("savedName")),
    };
    try {
      postToServer(newTweet);
      console.log(newTweet);
    }
    catch(error) {
      console.log(error);
    }
  };

  const postToServer = async (newTweet) => {
    const add = await addDoc(colRef, newTweet);
    getTweets();
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AddTweet handleAddTweet={addTweet} />
      <TweetsList tweets={tweets} />
    </div>
  );
}

export default Home;
