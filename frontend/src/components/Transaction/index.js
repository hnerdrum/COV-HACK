import React, {useEffect, useState} from 'react';
import styles from './Transaction.module.css';
import {Button} from "react-bootstrap";
import TransactionItem from "./TransactionItem";
import AlertModal from "../Common/AlertModal";

const Transaction = ({ db }) => {

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  const send = () => {
    setShowModal(true);
  };

  const cancel = () => {
      window.location.assign("/");
  };

  useEffect(() => {
     getStaticHospitalData()
  });

  const getStaticHospitalData = () => {
      const email = "brad@pitt.com";
      const hospitals = db.collection("hospitals");
      hospitals.where("email", "==", email).get()
          .then((querySnapshot) => {
              if(!querySnapshot.empty) {
                  setData(querySnapshot.docs[0].data());
              }
          })
          .catch((error) => {
              console.log(error);
          })
  };

  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recommended transaction</h2>
        <div className={styles.content}>
            <h4>Transaction Destination: {data.hospitalName || ""}</h4>
            <div className={styles.headlines}>
                <div className={styles.headline}><p>Item</p></div>
                <div className={styles.headline}><p>Grade</p></div>
                <div className={styles.headline}><p>Part</p></div>
                <div className={styles.headline}><p>Quantity</p></div>
            </div>
            <div className={styles.itemContainer}>
                {data.equipment && data.equipment.map((e, index) => {
                   return <TransactionItem key={index} equipment={e}/>
                })}
            </div>
        </div>
          <div className={styles.buttonContainer}>
              <Button type="button" className={styles.send} onClick={send} variant="primary" size="lg">
                  SEND
              </Button>
              <Button className={styles.cancel} onClick={cancel} variant="secondary" size="lg">
                  CANCEL
              </Button>
          </div>
          {showModal ? <AlertModal setShowModal={setShowModal} text="Transaction has been sent."/> : null}
      </div>
  )
};

export default Transaction;