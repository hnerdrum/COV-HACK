import React from 'react';

const Footer = () => {
    return (
      <footer className="page-footer font-small pt-4 bg-blue navfootColor">
        <div className="container-fluid text-center text-md-left width80">
          <div className="row">
            <div className="col-md-2 mt-md-0 mt-2">
              <a><img src="Logo.png" width="50" height="50" alt=""/></a>
            </div>
            <div className="col-md-2 mt-md-0 mt-2">
              <p className="alignCenter">About us</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-2" />
            <div className="col-md-2 mb-md-0 mb-2">
              <p className="alignCenter">Contact</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-2" />
            <div className="col-md-2 mb-md-0 mb-2">
              <p className="alignCenter">Privacy Policy</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-2" />
            <div className="col-md-2 mb-md-0 mb-2">
              <p className="alignCenter">Terms and Conditions</p>
            </div>
            <div className="col-md-2 mb-md-0 mb-2">
              <p className="alignCenter">Information Covid-19</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">© 2020 Copyright:
          <p>Scrappr</p>
        </div>
      </footer>
    );
};

export default Footer;
