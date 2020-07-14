import { db } from './index.js';

export const REQUEST_HOSPITAL = "REQUEST_HOSPITAL";
export const RECEIVE_HOSPITAL = "RECEIVE_HOSPITAL";

export const REQUEST_DOCUMENTS = "REQUEST_DOCUMENTS";
export const RECEIVE_DOCUMENTS = "RECEIVE_DOCUMENTS";

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

const requestDocuments = (query) => {
    return {
        type: REQUEST_DOCUMENTS,
        query
    }
};

const receiveDocuments = (query, documents) => {
    return {
        type: RECEIVE_DOCUMENTS,
        documents
    }
};

export const fetchDocuments = (query) => {
    return dispatch => {
        dispatch(requestDocuments(query));
        const documents = db.collection("scrapmetal");
        return documents.where("title", "array-contains", query).get()
            .then((querySnapshot) => {
                if(!querySnapshot.empty) {
                    let documents = [];
                    querySnapshot.forEach(doc => {documents.push(doc.data())});
                    dispatch(receiveDocuments(query, documents));
                }
            })
    }
};

