import React from 'react';
import styles from "./TextField.module.css";

const errorSpan = (error) => (
    <div>
        <span className={styles.error}>{error}</span>
    </div>
);

const TextField = ({ input, label, placeholder, type, meta: { touched, error }, className }) => (
    <div>
        <label>{label}</label>
        <div className={styles.container}>
            <input className={className || styles.input} {...input} placeholder={placeholder} type={type}/>
            <br/>
        </div>
        {touched && ((error && errorSpan(error)))}
    </div>
);

export default TextField;