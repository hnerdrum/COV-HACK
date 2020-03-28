import React from 'react';
import styles from "./InventoryField.module.css";
import {Field} from "redux-form";
import TextField from "../../TextField";

const errorSpan = (error) => (
    <div>
        <span className={styles.error}>{error}</span>
    </div>
);

const InventoryField = ({ fields, meta: { touched, error } }) => (
    <div>
        <div className={styles.container}>
            {fields.map((member, index) =>
                <div className={styles.inputContainer}>
                    <Field name={`${member}.category`}
                           label="Category"
                           component={TextField}
                           placeholder="Category"
                           className={styles.input}
                    />
                    <Field name={`${member}.part`}
                           label="Part"
                           component={TextField}
                           placeholder="Part"
                           className={styles.input}
                    />
                    <Field name={`${member}.grade`}
                           label="Grade"
                           component={TextField}
                           placeholder="Grade"
                           className={styles.input}
                    />
                    <Field name={`${member}.inUse`}
                           label="In Use"
                           component={TextField}
                           placeholder="Number of items in use"
                           className={styles.input}
                    />
                    <Field name={`${member}.reserved`}
                           label="Reserved"
                           component={TextField}
                           placeholder="Number of reserved items"
                           className={styles.input}
                    />
                    <Field name={`${member}.available`}
                           label="Available"
                           component={TextField}
                           placeholder="Number of available items"
                           className={styles.input}
                    />
                </div>
            )}

            {touched && ((error && errorSpan(error)))}
        </div>
        <button type="button" className={styles.addButton} onClick={() => fields.push({})}>Add Equipment</button>
    </div>
);

export default InventoryField;