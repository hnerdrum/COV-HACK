import React from 'react';
import styles from "./SearchResults.module.css"
import SearchItem from "./SearchItem";

const SearchResults = ({ history }) => {

  const data = [
      {
          title: "300 tonnes of grade A steel",
          position: "5 miles away",
          image: "steel.jpeg",
          price: "1000 £ / tonne"
      },
      {
          title: "750 tonnes of grade B steel",
          position: "2 miles away",
          image: "steel.jpeg",
          price: "500 £ / tonne"
      },
      {
          title: "100 tonnes of grade A steel",
          position: "17 miles away",
          image: "steel.jpeg",
          price: "700 £ / tonne"
      }
  ];

  return (
      <div className={styles.container}>
          {data.map((item) => (
              <SearchItem title={item.title} price={item.price} position={item.position} src={item.image} />
          ))}
      </div>
  )
};

export default SearchResults;