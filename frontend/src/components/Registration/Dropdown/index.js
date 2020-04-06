import React from 'react';
import styles from "./Dropdown.module.css";

const errorSpan = (error) => (
    <div>
        <span className={styles.error}>{error}</span>
    </div>
);

const Dropdown = ({ input, label, meta: { touched, error }, options }) => {

    return (
        <div>
        <label>{label}</label>
        <div>
            <select className={styles.dropdown} {...input}>
                <option></option>
                {options.map((item, index) => {return <option value={item} key={index}>{item}</option>})}
            </select>
            {touched && ((error && errorSpan(error)))}
        </div>
    </div>
)};

export default Dropdown;