import React, { useEffect, useState } from "react"
import steel from "../SearchResults/SearchItem/steel.jpeg"
import Loader from 'react-loader-spinner'
import SearchBar from "../SearchResults/SearchBar";
import styles from "./SingleListing.module.css"

const SingleListing = ({db}) => {
    const [listing, setListing] = useState(null);
    const [dataIsLoaded, setLoaded] = useState(false);

    useEffect(() => {
        loadData(db)
      }, [dataIsLoaded]);

    
    const loadData = () => {
        const listingId = window.location.pathname.split("/")[2];
        if(!dataIsLoaded){
            return db.collection("scrapmetal")
            .doc(listingId)
            .get()
            .then((snap) => {
                console.log(snap);
                setListing(() => snap.data())
                setLoaded(true)
            })
        }
    };

    /*
        location: 17 miles
        price: 200
        weigth: 100
        title: ["Grade", "A", "Steel"]
    */

        if (listing !== null) {
            return (
                <div className={"container " + styles.wrapper}>
                    <div className={styles.barcontainer}>
                        <div className={styles.bar}>
                            <SearchBar className={styles.bar}/>
                        </div>
                    </div>
                    <div className={"row " + styles.rowwrapper}>
                        <div className={styles.single_image}>
                            <img height="100%" width="100%" src={steel} alt="" className={styles.image}/>
                        </div>
                        <div className={styles.single_info}>
                            <h5 className={styles.title}>{listing.title.join(" ")}</h5>
                            <div className={styles.single_info_inner}>
                                <b><span className="fa fa-building-o"></span>  SIMS recycling ltd</b>
                                <b><span className="fa fa-clock-o"></span>  Normally replies in 15 minutes</b>
                                <b><span className="fa fa-commenting-o"></span>  98% reply frequency</b>
                                <b><span className="fa fa-map-marker"></span>  {listing.location} away</b>
                                <b><span className="fa fa-check"></span>  Delivery available</b>
                            </div>
                            <div className={styles.buttonwrapper}>
                                <button className={"btn btn-success " + styles.button}>Send offer</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.loader}>
                    <Loader
                        type="ThreeDots"
                        color="#556B2F"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs

                    />
                </div>
            );
        }
};

export default SingleListing;