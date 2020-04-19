import React from 'react';
import styles from './TransactionItem.module.css';

const TransactionItem = ({ item, grade, part, quantity }) => {
    return (
        <div className={styles.container}>
            <div className={styles.category}><h6>{item}</h6></div>
            <div className={styles.category}><h6>{grade}</h6></div>
            <div className={styles.category}><h6>{part}</h6></div>
            <div className={styles.category}><h6>{quantity}</h6></div>
        </div>
    )
};

export default TransactionItem;