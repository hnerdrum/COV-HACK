import React from 'react';
import styles from "./Dropdown.module.css";

const errorSpan = (error) => (
    <div>
        <span className={styles.error}>{error}</span>
    </div>
);

const Dropdown = ({ input, label, placeholder, type, meta: { touched, error }, className, options }) => {

    return (
        <div>
        <label>{label}</label>
        <div>
            {touched && ((error && errorSpan(error)))}
            <select className={styles.dropdown} {...input}>
                <option></option>
                {options.map((item, index) => {return <option value={item} key={index}>{item}</option>})}
            </select>
        </div>
    </div>
)};

export default Dropdown;