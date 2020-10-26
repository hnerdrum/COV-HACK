import React, {useState} from 'react';
import {fetchDocuments} from "../../actions";
import {useDispatch} from "react-redux";

const WelcomeMessage = ({ history }) => {

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const search = () => {
      dispatch(fetchDocuments(query.toLowerCase()));
      history.push("/search");
  };

  const handleChange = (event) => {
      setQuery(event.target.value)
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
        search();
    }
  };

  return (
      <div className="welcome-wrapper">
        <div className="inner-wrapper">
          <div className="announcement">
            <h1
                className="announcement-text alignCenter white">
                Find available scrap metal
            </h1>
            <h3
                className="announcement-text alignCenter white">
                World-wide, quick and easy
            </h3>
          </div>
        </div>
        <div className="form-group">
            <input
                className="search-scrap"
                type="text"
                placeholder="Search for the scrap you want"
                onChange={handleChange}
                onKeyDown={handleKeyDown} />
            <span className="search-icon fa fa-search fa-lg" onClick={search}/>
        </div>
      </div>
  )
};

export default WelcomeMessage;
