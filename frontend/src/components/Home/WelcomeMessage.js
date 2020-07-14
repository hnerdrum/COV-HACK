import React, {useEffect, useState} from 'react';
import {fetchDocuments} from "../../actions";
import {useDispatch, useSelector} from "react-redux";

const WelcomeMessage = ({ token, history }) => {

  const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    /*useEffect(() => {
        dispatch(fetchDocuments(query))
    }, []);*/

  const clickRegister = () => {
    window.location.assign( "/register");
  };

  const search = () => {
      dispatch(fetchDocuments(query));
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

  const renderWelcome = (token) => {
      if(!token) {
          return (
              <div className="registration-wrapper">
                  <h4 className="registration-text alignCenter white">Start connecting today</h4>
                  <button type="button" className="btn btn-lg registration-button" onClick={clickRegister}>REGISTER</button>
              </div>
          )
      }
      else {
          return (
          <div className="registration-wrapper">
              <h4 className="registration-text alignCenter white">Welcome!</h4>
          </div>)
      }
  };

  return (
      <div className="welcome-wrapper">
        <div className="inner-wrapper">
          <div className="announcement">
            <h1 className="announcement-text alignCenter white">Find avaiblable scrap metal</h1>
            <h3 className="announcement-text alignCenter white">In your vicinity, quick and easy</h3>
          </div>
        </div>
        <div className="form-group">
            <input className="search-scrap" type="text" placeholder="Search for the scrap you want" onChange={handleChange} onKeyDown={handleKeyDown} />
            <span className="search-icon fa fa-search fa-lg" onClick={search}/>
        </div>
      </div>
  )
};

export default WelcomeMessage;
