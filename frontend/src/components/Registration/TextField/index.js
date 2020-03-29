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
        {touched && ((error && errorSpan(error)))}
        <div className={styles.container}>
            <input className={className || styles.input} {...input} placeholder={placeholder} type={type}/>
            <br/>
        </div>
    </div>
);

export default TextField;