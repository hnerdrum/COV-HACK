import { db } from './index.js';

export const REQUEST_HOSPITAL = "REQUEST_HOSPITAL";
export const RECEIVE_HOSPITAL = "RECEIVE_HOSPITAL";

const requestHospital = (email) => {
    return {
        type: REQUEST_HOSPITAL,
        email
    }
};

const receiveHospital = (email, hospital) => {
    return {
        type: RECEIVE_HOSPITAL,
        hospital
    }
};

export const fetchHospital = (email) => {
  return dispatch => {
      dispatch(requestHospital(email));
      const hospitals = db.collection("hospitals");
      return hospitals.where("email", "==", email).get()
          .then((querySnapshot) => {
              if(!querySnapshot.empty) {
                  dispatch(receiveHospital(email, querySnapshot.docs[0].data()));
              }
          })
  }
};