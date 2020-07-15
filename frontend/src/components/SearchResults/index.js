import React, {useEffect} from 'react';
import styles from "./SearchResults.module.css"
import SearchItem from "./SearchItem";
import {useHistory} from "react-router-dom";
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const SearchResults = ({ }) => {

    const history = useHistory();
    const documents = useSelector(state => state.documents.items);
    const isFetching = useSelector(state => state.documents.isFetching);

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

  console.log(documents);

  const renderResults = () => {
      if(isFetching) {
          return (
              <div className={styles.container}>
                  <Loader
                      type="ThreeDots"
                      color="#556B2F"
                      height={100}
                      width={100}
                      timeout={3000} //3 secs

                  />
              </div>
          )
      }
      else {
          return (
              <div className={styles.container}>
                  <div className={styles.bar}>
                      <SearchBar history={history} className={styles.bar}/>
                  </div>
                  <div className={styles.inner}>
                      {documents && documents.map((item, i) => (
                          <SearchItem key={i} title={item.title.join(' ')} weight={item.weight} position={item.location} src={item.image} />
                      ))}
                  </div>
              </div>
          )
      }
  };

  return renderResults();


};

export default SearchResults;