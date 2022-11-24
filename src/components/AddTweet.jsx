import "../App.css";
import { useState, useContext } from "react";

const AddTweet = ({ handleAddTweet }) => {
  const [tweetText, setTweetText] = useState("");

  const characterLimit = 140;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setTweetText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (tweetText.trim().length > 0) {
      handleAddTweet(tweetText);
      setTweetText("");
    }
  };

  return (
    <div className="notenew">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={tweetText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - tweetText.length} Remaining</small>
        <button className="save" onClick={handleSaveClick}>
          Tweet
        </button>
      </div>
    </div>
  );
};

export default AddTweet;
