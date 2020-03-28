import React from 'react';
import styles from "./TextField.module.css";

const errorSpan = (error) => (
    <div>
        <span className={styles.error}>{error}</span>
    </div>
);

const TextField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className={styles.input} {...input} placeholder={placeholder} type={type}/>
            <br/>
            {touched && ((error && errorSpan(error)))}
        </div>
    </div>
);

export default TextField;