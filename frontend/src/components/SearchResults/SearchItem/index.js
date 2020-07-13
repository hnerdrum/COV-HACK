import React from 'react';
import styles from "./SearchItem.module.css"
import steel from "./steel.jpeg"

const SearchItem = ({title, price, position, src}) => {
  return (
      <div className={styles.container}>
          <img src={steel} alt="" className={styles.image}/>
          <div className={styles.textContainer}>
              <p className={styles.title}>{title}</p>
              <p className={styles.price}>{price}</p>
              <p className={styles.position}>{position}</p>
          </div>
      </div>
  )
};

export default SearchItem;