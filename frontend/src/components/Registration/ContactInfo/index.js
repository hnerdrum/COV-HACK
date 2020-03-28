import React from 'react';
import styles from "./ContactInfo.module.css";
import { Field } from 'redux-form';
import TextField from "../../TextField";

const required = value => value ? undefined : 'Required'
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
const password = value =>
    value && value.length >= 8 ? undefined : "Password must be at least 8 characters long.";

const equalPassword = (value, allValues) =>
    value !== allValues.password ?
        'Passwords do not match' :
        undefined;

const ContactInfo = () => {
    return (
        <div className={styles.container}>
            <h2 id={styles.title}>Contact Info</h2>
            <Field name="hospitalName"
                   label="Hospital Name"
                   component={TextField}
                   placeholder="Name of hospital"
                   validate={required}
                   />
            <Field name="hospitalAddress"
                   label="Hospital Address"
                   component={TextField}
                   placeholder="Address"
                   validate={required}
            />
            <Field name="contactName"
                   label="Contact Person"
                   component={TextField}
                   placeholder="Name of contact person"
                   validate={required}
            />
            <Field name="email"
                   label="Email address of contact person"
                   component={TextField}
                   placeholder="Email"
                   validate={[required, email]}
            />
            <Field name="phoneNumber"
                   label="Phone number of contact person"
                   component={TextField}
                   placeholder="Phone Number"
                   validate={required}
            />
            <Field name="password"
                   type="password"
                   label="Password"
                   component={TextField}
                   placeholder="Password"
                   validate={[required, password]}
            />
            <Field name="passwordRepeat"
                   type="password"
                   label="Repeat Password"
                   component={TextField}
                   placeholder="Password"
                   validate={[required, password, equalPassword]}
            />
        </div>
    );
};

export default ContactInfo;