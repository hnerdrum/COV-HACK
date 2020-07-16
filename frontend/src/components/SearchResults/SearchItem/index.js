import React from 'react';
import styles from "./SearchItem.module.css"
import steel from "./steel.jpeg"
import { Link } from "react-router-dom";

const SearchItem = ({id, title, weight, position}) => {

  return (
      <div className={styles.container}>
          <img src={steel} alt="" className={styles.image}/>
          <div className={styles.textContainer}>
              <p className={styles.title}>{title}</p>
              <p className={styles.price}>{weight + " tonnes"}</p>
              <p className={styles.position}>{position + " away"}</p>
          </div>
          <div className={styles.buttoncontainer}>
            <Link to={"/listing/"+id}>
                <button className={"btn btn-success " + styles.buttonTo}>Go to listing</button>
            </Link>
          </div>
      </div>
  )
};

export default SearchItem;