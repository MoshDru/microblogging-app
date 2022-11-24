import "../App.css";
import Tweet from './Tweet';
import { useState, useContext } from 'react';
import Context from '../context/ThemeContext';

const TweetsList = () => {
    const {tweets} = useContext(Context);
    return (
        <div className='notes-list'>
            {tweets.map((tweet) => (
                <Tweet
                    key={tweet.id}
                    id={tweet.id}
                    username={tweet.userName}
                    text={tweet.content}
                    date={tweet.date}
                />
            ))}
        </div>
    );
};

export default TweetsList;
