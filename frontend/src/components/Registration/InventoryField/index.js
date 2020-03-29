import React, {useState} from 'react';
import styles from "./InventoryField.module.css";
import {Field} from "redux-form";
import TextField from "../TextField";
import Dropdown from "../Dropdown";
import 'react-widgets/dist/css/react-widgets.css'
import {Button} from "react-bootstrap";


const errorSpan = (error) => (
    <div>
        <span className={styles.error}>{error}</span>
    </div>
);

const categories = ["Gloves", "Face Mask", "Breathing Guard", "Contamination Gown", "Surgical Hat"];
const parts = ["Type1", "Type2", "Type3", "Type4"];
const grades = ["A", "B", "C"];

const filterState = (state, i) => {
  state.filter((elem, index) => {if(index !== i) return elem});
};

const InventoryField = ({ fields, meta: { touched, error } }) => {

    const {fieldsState, setFields } = useState(fields);

    return (
        <div>
            <div className={styles.container}>
                {fields.map((member, index) =>
                    <div className={styles.inputContainer}>
                        <Field name={`${member}.category`}
                               label="Category"
                               options={categories}
                               component={Dropdown}
                               className={styles.input}
                        />
                        <Field name={`${member}.part`}
                               label="Part"
                               options={parts}
                               component={Dropdown}
                               className={styles.input}
                        />
                        <Field name={`${member}.grade`}
                               label="Grade"
                               options={grades}
                               component={Dropdown}
                               className={styles.input}
                        />
                        <Field name={`${member}.inUse`}
                               label="In Use"
                               component={TextField}
                               placeholder="Items in use"
                               className={styles.input}
                        />
                        <Field name={`${member}.reserved`}
                               label="Reserved"
                               component={TextField}
                               placeholder="Reserved items"
                               className={styles.input}
                        />
                        <Field name={`${member}.available`}
                               label="Available"
                               component={TextField}
                               placeholder="Available items"
                               className={styles.input}
                        />
                        <Button variant="danger" className={styles.deleteButton} onClick={() => fields.splice(index, 1)}>Delete</Button>
                    </div>
                )}

                {touched && ((error && errorSpan(error)))}
            </div>
            <button type="button" className={styles.addButton} onClick={() => fields.push({})}>Add Equipment</button>
        </div>
)};

export default InventoryField;