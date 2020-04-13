import React from 'react';

const WelcomeMessage = ({ token }) => {

  const clickRegister = () => {
    window.location.assign( "/register");
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
            <h3 className="announcement-text alignCenter white">Helping to connect hospitals in need of immediate critical resources to help fight COVID-19</h3>
          </div>
          {renderWelcome(token)}
        </div>
        <div className="binding-text">
          <h4>Critical resources in the UK</h4>
        </div>
      </div>
  )
}

export default WelcomeMessage;
