import React, {useEffect} from 'react';
import styles from "./SearchResults.module.css"
import SearchItem from "./SearchItem";
import {useHistory} from "react-router-dom";
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {fetchDocuments, fetchHospital} from "../../actions";

const SearchResults = ({ }) => {

    const history = useHistory();
    const documents = useSelector(state => state.documents.items);

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
          <div className={styles.bar}>
              <SearchBar history={history} className={styles.bar}/>
          </div>
          <div className={styles.inner}>
              {documents && documents.map((item, i) => (
                  <SearchItem key={i} title={item.title.join(' ')} price={item.price} position={item.location} src={item.image} />
              ))}
          </div>
      </div>
  )
};

export default SearchResults;