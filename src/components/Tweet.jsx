import "../App.css";

const Tweet = ({ id, username, text, date }) => {
    console.log(date.slice(5,7))
    console.log(date.slice(8,10))
    console.log(date)
    const getPrettyDate = () =>{
        return date.slice(5,7)+"/"+date.slice(8,10)+"/"+date.slice(0,4)
    }
    return (
        <div className='note'>
            <div className='note-header'>
            <span>{username}</span>
            <span>{getPrettyDate()}</span>
            </div>
            <div className='note-footer'>
            <small className="note-text">{text}</small>
            </div>
        </div>
    );
};

export default Tweet;
