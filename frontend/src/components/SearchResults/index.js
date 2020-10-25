import React from 'react';
import styles from "./SearchResults.module.css"
import SearchItem from "./SearchItem";
import {useHistory} from "react-router-dom";
import SearchBar from "./SearchBar";
import {useSelector} from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {COLOR_PRIMARY} from "../../colors";

const SearchResults = () => {

    const history = useHistory();
    const documents = useSelector(state => state.documents.items);
    const isFetching = useSelector(state => state.documents.isFetching);

  const renderResults = () => {
      if(isFetching) {
          return (
              <div className={styles.container}>
                  <Loader
                      type="ThreeDots"
                      color={COLOR_PRIMARY}
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
                          <SearchItem key={i} title={item.title.join(' ')} id={item.id} weight={item.weight} position={item.location} src={item.image} />
                      ))}
                  </div>
              </div>
          )
      }
  };

  return renderResults();


};

export default SearchResults;