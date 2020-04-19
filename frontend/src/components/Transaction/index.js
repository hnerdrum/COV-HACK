import React from 'react';
import styles from './Transaction.module.css';
import {Button} from "react-bootstrap";

const Transaction = () => {
  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recommended transaction</h2>
        <div className={styles.content}>
            <div className={styles.headlines}>
                <p>Item</p>
                <p>Grade</p>
                <p>Part</p>
                <p>Quantity</p>
                <p>Destination</p>
            </div>
            <div className={styles.buttonContainer}>
                <Button type="button" className={styles.send} variant="primary" size="lg">
                    SEND
                </Button>
                <Button className={styles.cancel} variant="secondary" size="lg">
                    CANCEL
                </Button>
            </div>
        </div>
      </div>
  )
};

export default Transaction;