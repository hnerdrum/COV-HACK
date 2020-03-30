import React, {useState} from 'react';
import styles from "../Registration/TextField/TextField.module.css";

const getEmail = () => {
  return document.getElementById("user-id").value;
};

const getPassword = () => {
  return document.getElementById("password").value;
};

const errorSpan = (error) => (
    <div>
      <span style={{color: "red"}}>{error}</span>
    </div>
);

const LoginModal = (props) => {

  const [error, setError] = useState(false);

  const authenticate = (email, password) => {
    props.auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
          props.setShowModal();
          localStorage.setItem('login', true);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
  };

  return (
    <div className="modal" id="exampleModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Enter login information</h5>
            <button type="button" className="close" onClick={() => props.setShowModal()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                <input type="text" className="form-control" id="user-id"/>
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">Password:</label>
                <input type="password" className="form-control" id="password"/>
              </div>
            </form>
            {error && errorSpan("Invalid username and password")}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => props.setShowModal()}>Close</button>
            <button type="button" className="btn btn-primary" onClick={() => authenticate(getEmail(), getPassword())}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal;
