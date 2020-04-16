import React, {useState} from 'react';

const getEmail = () => {
  return document.getElementById("user-id").value || "";
};

const getPassword = () => {
  return document.getElementById("password").value || "";
};

const errorSpan = (error) => (
    <div>
      <span style={{color: "red"}}>{error}</span>
    </div>
);

const LoginModal = ({ setShowModal, db, auth, setToken, setCoordinates }) => {

  const [error, setError] = useState(false);

  const getCoordinatesFromFirebase = (email) => {
    const hospitals = db.collection("hospitals");
    hospitals.where("email", "==", email).get()
        .then((querySnapshot) => {
            if(!querySnapshot.empty) {
                const hospital = querySnapshot.docs[0].data();
                setShowModal();
                setCoordinates(hospital.lat, hospital.lng);
                setToken(auth);
            }
            else {
                setError(true);
            }
        })
        .catch((error) => {
            console.log(error);
            setError(true);
        })
  };

  const authenticate = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
          getCoordinatesFromFirebase(email);
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
            <button type="button" className="close" onClick={() => setShowModal()}>
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
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal()}>Close</button>
            <button type="button" className="btn btn-primary" onClick={() => authenticate(getEmail(), getPassword())}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginModal;
