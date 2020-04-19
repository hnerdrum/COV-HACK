import React from 'react';
import styles from './TransactionItem.module.css';

const TransactionItem = ({ equipment }) => {
    return (
        <div className={styles.container}>
            <div className={styles.category}><h6>{equipment.category || ""}</h6></div>
            <div className={styles.category}><h6>{equipment.grade || ""}</h6></div>
            <div className={styles.category}><h6>{equipment.part || ""}</h6></div>
            <div className={styles.category}><h6>{equipment.inUse || ""}</h6></div>
        </div>
    )
};

export default TransactionItem;