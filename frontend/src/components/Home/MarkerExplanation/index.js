import React from 'react';
import styles from './MarkerExplanation.module.css';

const MarkerExplanation = () => {
  return (
      <div className={styles.container}>
        <div className={styles.itemContainer}>
            <div className={styles.red}/>
            <div className={styles.textContainer}>
                <h6>In use</h6>
                <p>All stock is in circulation</p>
            </div>
        </div>
        <div className={styles.itemContainer}>
            <div className={styles.yellow}/>
            <div className={styles.textContainer}>
                <h6>Reserved</h6>
                <p>Item is being preemptively stocked</p>
            </div>
        </div>
        <div className={styles.itemContainer}>
            <div className={styles.green}/>
            <div className={styles.textContainer}>
                <h6>Available</h6>
                <p>Item is in high supply</p>
            </div>
        </div>
      </div>
  )
};

export default MarkerExplanation;