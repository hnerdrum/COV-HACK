import React from 'react';
import styles from './Transaction.module.css';
import {Button} from "react-bootstrap";
import TransactionItem from "./TransactionItem";

const Transaction = () => {
  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recommended transactions</h2>
        <div className={styles.content}>
            <div className={styles.headlines}>
                <div className={styles.headline}><p>Item</p></div>
                <div className={styles.headline}><p>Grade</p></div>
                <div className={styles.headline}><p>Part</p></div>
                <div className={styles.headline}><p>Quantity</p></div>
            </div>
            <div className={styles.itemContainer}>
                <TransactionItem item="Face Mask" grade="A" part="None" quantity="100"/>
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