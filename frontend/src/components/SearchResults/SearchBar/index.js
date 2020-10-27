import React, { useState } from 'react';
import styles from "./SearchBar.module.css"
import { fetchDocuments } from '../../../actions';
import {useDispatch } from "react-redux";

const SearchBar = ({ history }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value.toLowerCase())
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const search = () => {
        dispatch(fetchDocuments(query));
    };

    return (
        <div className={styles.container}>
            <input className={styles.searchScrap} type="text" placeholder="Search for the scrap you want" onChange={handleChange} onKeyDown={handleKeyDown} />
            <span className="search-icon fa fa-search fa-lg" onClick={search} />
        </div>
    )
};

export default SearchBar;