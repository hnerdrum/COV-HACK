import React, {useState} from 'react';
import styles from './Transaction.module.css';
import {Button} from "react-bootstrap";
import TransactionItem from "./TransactionItem";
import AlertModal from "../Common/AlertModal";

const Transaction = () => {

  const [showModal, setShowModal] = useState(false);

  const send = () => {
    setShowModal(true);
  };

  const cancel = () => {
      window.location.assign("/");
  };

  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recommended transaction</h2>
        <div className={styles.content}>
            <h4>Transaction Destination: The Royal Liverpool University Hospital</h4>
            <div className={styles.headlines}>
                <div className={styles.headline}><p>Item</p></div>
                <div className={styles.headline}><p>Grade</p></div>
                <div className={styles.headline}><p>Part</p></div>
                <div className={styles.headline}><p>Quantity</p></div>
            </div>
            <div className={styles.itemContainer}>
                <TransactionItem item="Face Mask" grade="A" part="-" quantity="100"/>
                <TransactionItem item="Contamination Gown" grade="C" part="-" quantity="400"/>
                <TransactionItem item="Gloves" grade="B" part="-" quantity="200"/>
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